/* STORYBOOK — script */
(function () {
  const D = window.PETEXPERT, U = D.util, B = D.brand;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const photo = (i) => D.photos[i % 12];
  const rots = [-3, 2, -1.5, 3, -2, 1, 2.5, -2.5];

  $$("[data-brand]").forEach((el) => (el.textContent = B[el.dataset.brand] || ""));
  $$("[data-founder]").forEach((el) => (el.textContent = D.team[el.dataset.founder] || ""));
  $$("[data-wa]").forEach((a) => (a.href = U.waLink()));
  $$("[data-ig]").forEach((a) => (a.href = B.instagramUrl));
  $$("[data-tel]").forEach((a) => (a.href = "tel:" + B.phoneIntl));
  $$("[data-maps]").forEach((a) => (a.href = B.mapsUrl));
  $$("[data-site]").forEach((a) => (a.href = B.website));
  $("#year").textContent = new Date().getFullYear();
  $("#schedule").innerHTML = B.schedule.map((s) => `<div class="sched"><span>${esc(s.days)}</span><span>${esc(s.hours)}</span></div>`).join("");

  /* hero words */
  const h = $(".hero__title"); const html = h.innerHTML; h.setAttribute("aria-label", h.textContent);
  let i = 0; h.innerHTML = html.replace(/(<span class="ul">)(.*?)(<\/span>)|([^<\s]+)/g, (m, o, inner, c, word) => { if (word) return `<span class="w" style="--i:${i++}">${word}</span>`; return `${o}${inner.split(" ").map((w) => `<span class="w" style="--i:${i++}">${w}</span>`).join(" ")}${c}`; });

  /* sticker sheet */
  $("#services").innerHTML = D.services.map((s, k) => `
    <div class="stk reveal" style="--rot:${rots[k % 8] / 2}deg"><button type="button" aria-label="${esc(s.name)}: detalii">
      <span class="face face--front"><span class="stk__badge">${esc(D.serviceGroups.find((g) => g.id === s.group).short)}</span><figure><img data-photo="${esc(photo(k).tag)}" src="${U.photoPath(photo(k).src)}" alt="" width="400" height="400" loading="lazy"></figure><span class="stk__name">${esc(s.name)}</span><span class="stk__price">${esc(U.priceLabel(s.price, s.unit, s.from))}</span></span>
      <span class="face face--back"><p>${esc(s.description)}</p><span><span class="meta">${esc(s.duration)}${s.sessions ? " · " + esc(s.sessions) : ""}</span><a class="btn btn--red" href="${U.waLink(`Bună! Aș dori o programare la Pet Expert pentru: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener">Programează</a></span></span>
    </button></div>`).join("");
  $("#services").addEventListener("click", (e) => { if (e.target.closest("a")) return; const c = e.target.closest(".stk"); if (c) c.classList.toggle("is-flipped"); });

  /* album, comic, notes, team */
  $("#gallery").innerHTML = D.photos.slice(0, 12).map((p, k) => `<figure class="tape reveal" style="--rot:${rots[k % 8]}deg;--tape:${rots[(k + 3) % 8] * 2}deg"><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="800" height="1000" loading="lazy"><figcaption>${esc(p.tag)}</figcaption></figure>`).join("");
  const bubbles = ["„Cine-i cuminte?”", "„Ia să vedem blănița…”", "„Spumă, spumă, spumă!”", "„Gata! Ce frumos ești!”"];
  $("#process").innerHTML = D.process.map((p, k) => `<li class="panel reveal"><h3>${esc(p.step)}</h3><p>${esc(p.text)}</p><span class="bubble">${bubbles[k % 4]}</span></li>`).join("");
  $("#quotes").innerHTML = D.testimonials.map((q, k) => `<article class="note reveal" style="--rot:${rots[(k + 1) % 8] / 1.5}deg"><p>„${esc(q.text)}”</p><footer><span>${esc(q.name)} · ${esc(q.service)}</span><span class="stars" aria-label="${q.rating} din 5">${"★".repeat(q.rating || 5)}</span></footer></article>`).join("");
  $("#story").innerHTML = D.team.story.slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats.map((s) => `<li class="reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");

  /* info */
  const acc = (items) => items.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#tabs").innerHTML = [["faq", "Întrebări"], ["care", D.aftercare.title], ["policies", D.policies.title]].map(([id, l], k) => `<button role="tab" class="${k === 0 ? "is-on" : ""}" aria-selected="${k === 0}" data-id="${id}">${esc(l)}</button>`).join("");
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$("#tabs button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); }); $$(".acc").forEach((a) => a.classList.toggle("is-on", a.id === b.dataset.id)); });
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#f3e7d0", "#f3b53d", "#2a2622");

  /* reveals (sections too, for underline + arrow) */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  $$(".sheet__grid, .album__grid, .comic__strip, .wallp__grid, .stats").forEach((g) => $$(".reveal", g).forEach((el, k) => (el.style.transitionDelay = Math.min(k * 60, 360) + "ms")));
  $$(".reveal, section").forEach((el) => io.observe(el));

  /* paw trail: a meandering path down the whole page, drawn by scroll; a walker follows it */
  const svg = $("#trail"), path = $("#trail-path"), paws = $("#trail-paws"), walker = $("#walker");
  let L = 0, pawPts = [];
  const build = () => {
    const H = document.documentElement.scrollHeight, W = innerWidth; svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const segs = Math.max(6, Math.round(H / 700)); let d = `M ${W * 0.12} ${innerHeight * 0.9}`; let y = innerHeight * 0.9;
    for (let s = 0; s < segs; s++) { const ny = y + (H - innerHeight * 0.9 - 200) / segs; const x1 = s % 2 ? W * 0.12 : W * 0.88; d += ` C ${x1} ${y + 120}, ${x1} ${ny - 120}, ${s % 2 ? W * 0.16 : W * 0.84} ${ny}`; y = ny; }
    path.setAttribute("d", d); L = path.getTotalLength(); path.style.strokeDasharray = `${L}`; path.style.strokeDashoffset = `${L}`;
    paws.innerHTML = ""; pawPts = [];
    for (let k = 1; k < 40; k++) { const at = (L / 40) * k; const p = path.getPointAtLength(at), p2 = path.getPointAtLength(Math.min(L, at + 2)); const ang = Math.atan2(p2.y - p.y, p2.x - p.x) * 180 / Math.PI + 90; const side = k % 2 ? 14 : -14; const g = document.createElementNS("http://www.w3.org/2000/svg", "g"); g.setAttribute("class", "paw"); g.setAttribute("transform", `translate(${p.x + Math.cos((ang) * Math.PI / 180) * side} ${p.y + Math.sin((ang) * Math.PI / 180) * side}) rotate(${ang})`); g.innerHTML = `<ellipse rx="6" ry="7.5" cy="4"/><circle r="2.6" cx="-6" cy="-4"/><circle r="2.6" cx="-2" cy="-8"/><circle r="2.6" cx="2" cy="-8"/><circle r="2.6" cx="6" cy="-4"/>`; g.dataset.at = at; paws.appendChild(g); pawPts.push(g); }
  };
  let raf = 0;
  const frame = () => {
    raf = 0; const max = document.documentElement.scrollHeight - innerHeight; const prog = max ? Math.min(1, Math.max(0, (scrollY + innerHeight * 0.85 - innerHeight * 0.9) / (max))) : 0;
    const at = L * prog; path.style.strokeDashoffset = `${L - at}`; pawPts.forEach((g) => g.classList.toggle("is-on", +g.dataset.at < at));
    const p = path.getPointAtLength(at), p2 = path.getPointAtLength(Math.min(L, at + 3)); const dir = p2.x - p.x; walker.setAttribute("transform", `translate(${p.x} ${p.y}) scale(${dir < 0 ? -1 : 1},1)`);
  };
  const onScroll = () => { if (!raf) raf = requestAnimationFrame(frame); };
  if (!reduce) { build(); frame(); addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", () => { build(); frame(); }); addEventListener("load", () => { build(); frame(); }); setTimeout(() => { build(); frame(); }, 1200); }
  else svg.remove();
})();
