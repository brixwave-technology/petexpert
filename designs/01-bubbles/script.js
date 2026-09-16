/* BUBBLES — script */
(function () {
  const D = window.PETEXPERT, U = D.util, B = D.brand;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const photo = (i) => D.photos[i % 12];

  /* bindings */
  $$("[data-brand]").forEach((el) => (el.textContent = B[el.dataset.brand] || ""));
  $$("[data-founder]").forEach((el) => (el.textContent = D.team[el.dataset.founder] || ""));
  $$("[data-wa]").forEach((a) => (a.href = U.waLink()));
  $$("[data-ig]").forEach((a) => (a.href = B.instagramUrl));
  $$("[data-tel]").forEach((a) => (a.href = "tel:" + B.phoneIntl));
  $$("[data-maps]").forEach((a) => (a.href = B.mapsUrl));
  $$("[data-site]").forEach((a) => (a.href = B.website));
  $("#year").textContent = new Date().getFullYear();
  $("#schedule").innerHTML = B.schedule.map((s) => `<div class="sched"><span>${esc(s.days)}</span><span>${esc(s.hours)}</span></div>`).join("");
  $("#hero-facts").innerHTML = D.stats.slice(0, 3).map((s) => `<li>${esc(s.value)} ${esc(s.label)}</li>`).join("");

  /* hero letters */
  const t = $("#hero-title"), text = t.textContent; t.setAttribute("aria-label", text); t.innerHTML = "";
  let i = 0; text.split(" ").forEach((w, wi, arr) => { const span = document.createElement("span"); span.style.whiteSpace = "nowrap"; [...w].forEach((ch) => { const l = document.createElement("span"); l.className = "l"; l.style.setProperty("--i", i++); l.textContent = ch; span.appendChild(l); }); t.appendChild(span); if (wi < arr.length - 1) { const sp = document.createElement("span"); sp.className = "sp"; sp.innerHTML = "&nbsp;"; t.appendChild(sp); } });

  /* species picker + soaps */
  const speciesPhoto = { caini: 1, pisici: 3, iepuri: 5 };
  $("#pick").innerHTML = D.serviceGroups.map((g, k) => `<button class="pet-btn ${k === 0 ? "is-on" : ""}" role="tab" aria-selected="${k === 0}" data-id="${g.id}"><i><img data-photo="${esc(g.short)}" src="${U.photoPath(photo(speciesPhoto[g.id] - 1).src)}" alt="" width="200" height="200"></i><b>${esc(g.name)}</b></button>`).join("");
  $("#services").innerHTML = D.services.map((s, k) => `
    <article class="soap" data-group="${s.group}" style="--i:${k}">
      <button class="soap__head" aria-expanded="false">
        <span class="soap__img"><img data-photo="${esc(photo(k).tag)}" src="${U.photoPath(photo(k).src)}" alt="" width="200" height="200" loading="lazy"></span>
        <span><span class="soap__name">${esc(s.name)}</span><span class="soap__sub">${esc(s.subtitle)}</span></span>
        <span class="soap__price">${esc(U.priceLabel(s.price, null, s.from))}<small>${esc(s.unit || "")}</small></span>
      </button>
      <div class="soap__body"><div><p>${esc(s.description)}</p><div class="soap__meta"><span>${esc(s.duration)}</span>${s.sessions ? `<span>${esc(s.sessions)}</span>` : ""}<a class="btn btn--primary" href="${U.waLink(`Bună! Aș dori o programare la Pet Expert pentru: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener">Programează</a></div></div></div>
    </article>`).join("");
  const setGroup = (id) => {
    $$(".pet-btn").forEach((b) => { const on = b.dataset.id === id; b.classList.toggle("is-on", on); b.setAttribute("aria-selected", on); });
    $$(".soap").forEach((s) => s.classList.toggle("is-hidden", s.dataset.group !== id));
    $("#pick-text").textContent = D.serviceGroups.find((g) => g.id === id).text;
  };
  $("#pick").addEventListener("click", (e) => { const b = e.target.closest(".pet-btn"); if (b) setGroup(b.dataset.id); });
  $("#services").addEventListener("click", (e) => { const h = e.target.closest(".soap__head"); if (!h) return; const card = h.parentElement, open = card.classList.toggle("is-open"); h.setAttribute("aria-expanded", open); });
  setGroup("caini");

  /* squeegee */
  const sq = $("#sq"), range = $("#sq-range");
  const setX = (v) => sq.style.setProperty("--x", v + "%"); range.addEventListener("input", () => setX(range.value)); setX(55);
  const fit = () => { $("#sq-before img").style.width = sq.clientWidth + "px"; }; addEventListener("resize", fit); fit();

  /* gallery, steps, quotes, story, stats */
  $("#gallery").innerHTML = D.photos.slice(0, 12).map((p, k) => `<figure class="shot reveal" style="--r-deg:${[-2, 1.5, -1, 2, -1.5, 1][k % 6]}"><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="800" height="1000" loading="lazy"><figcaption>${esc(p.tag)}</figcaption></figure>`).join("");
  $("#process").innerHTML = D.process.map((p) => `<li class="reveal"><div><h3>${esc(p.step)}</h3><p>${esc(p.text)}</p></div></li>`).join("");
  $("#quotes").innerHTML = D.testimonials.map((q) => `<article class="msg reveal"><p>${esc(q.text)}</p><footer>${esc(q.name)} · ${esc(q.service)}<span class="stars" aria-label="${q.rating} din 5">${"★".repeat(q.rating || 5)}</span></footer></article>`).join("");
  $("#story").innerHTML = D.team.story.slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats.map((s) => `<li class="reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");

  /* info */
  const acc = (items) => items.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#tabs").innerHTML = [["faq", "Întrebări"], ["care", D.aftercare.title], ["policies", D.policies.title]].map(([id, l], k) => `<button role="tab" class="${k === 0 ? "is-on" : ""}" aria-selected="${k === 0}" data-id="${id}">${esc(l)}</button>`).join("");
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$("#tabs button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); }); $$(".acc").forEach((a) => a.classList.toggle("is-on", a.id === b.dataset.id)); });
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#dff1ff", "#7cc4ff", "#0f2f5c");

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  $$(".gallery__row, .steps__list, .chat__list, .stats").forEach((g) => $$(".reveal", g).forEach((el, k) => (el.style.transitionDelay = Math.min(k * 70, 350) + "ms")));
  $$(".reveal").forEach((el) => io.observe(el));

  /* bubbles canvas */
  const cv = $("#bubbles"), ctx = cv.getContext("2d");
  let W = 0, H = 0, bubbles = [], pops = [];
  const N = () => (innerWidth < 720 ? 26 : 46);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const mk = (y) => ({ x: rnd(0, W), y: y == null ? rnd(0, H) : y, r: rnd(5, 26), v: rnd(0.25, 0.9), w: rnd(0.6, 1.6), p: rnd(0, Math.PI * 2), a: rnd(0.35, 0.8) });
  const resize = () => { const dpr = Math.min(2, devicePixelRatio || 1); W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); bubbles = Array.from({ length: N() }, () => mk()); };
  const drawBubble = (b, r, alpha) => { ctx.beginPath(); ctx.arc(b.x, b.y, r, 0, Math.PI * 2); const g = ctx.createRadialGradient(b.x - r * .35, b.y - r * .35, r * .1, b.x, b.y, r); g.addColorStop(0, `rgba(255,255,255,${.9 * alpha})`); g.addColorStop(.6, `rgba(180,225,255,${.25 * alpha})`); g.addColorStop(1, `rgba(28,95,168,${.35 * alpha})`); ctx.fillStyle = g; ctx.fill(); ctx.lineWidth = 1; ctx.strokeStyle = `rgba(28,95,168,${.35 * alpha})`; ctx.stroke(); };
  let last = performance.now();
  const loop = (t) => {
    const dt = Math.min(40, t - last) / 16.7; last = t;
    ctx.clearRect(0, 0, W, H);
    bubbles.forEach((b) => { b.y -= b.v * dt; b.p += 0.02 * dt; b.x += Math.sin(b.p) * b.w * 0.4 * dt; if (b.y < -40) Object.assign(b, mk(H + 40)); drawBubble(b, b.r, b.a); });
    pops = pops.filter((p) => (p.t += dt) < 18);
    pops.forEach((p) => { const k = p.t / 18; for (let j = 0; j < 7; j++) { const a = (j / 7) * Math.PI * 2; ctx.beginPath(); ctx.arc(p.x + Math.cos(a) * p.r * (1 + k * 2), p.y + Math.sin(a) * p.r * (1 + k * 2), Math.max(0.5, 3 * (1 - k)), 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${1 - k})`; ctx.fill(); } });
    requestAnimationFrame(loop);
  };
  resize(); addEventListener("resize", resize);
  if (reduce) { ctx.clearRect(0, 0, W, H); bubbles.forEach((b) => drawBubble(b, b.r, b.a * .6)); }
  else {
    requestAnimationFrame(loop);
    const pop = (x, y) => { let hit = false; bubbles.forEach((b) => { if (Math.hypot(b.x - x, b.y - y) < b.r + 14) { pops.push({ x: b.x, y: b.y, r: b.r, t: 0 }); Object.assign(b, mk(H + 40)); hit = true; } }); return hit; };
    addEventListener("pointerdown", (e) => pop(e.clientX, e.clientY), { passive: true });
    addEventListener("pointermove", (e) => { if (e.pointerType === "mouse") pop(e.clientX, e.clientY); }, { passive: true });
  }
})();
