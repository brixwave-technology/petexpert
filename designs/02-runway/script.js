/* RUNWAY — script */
(function () {
  const D = window.PETEXPERT, U = D.util, B = D.brand;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const photo = (i) => D.photos[i % 12];

  $$("[data-brand]").forEach((el) => (el.textContent = B[el.dataset.brand] || ""));
  $$("[data-founder]").forEach((el) => (el.textContent = D.team[el.dataset.founder] || ""));
  $$("[data-wa]").forEach((a) => (a.href = U.waLink("Bună! Aș dori să rezerv un loc la Pet Expert pentru frezură. Când aveți disponibilitate?")));
  $$("[data-ig]").forEach((a) => (a.href = B.instagramUrl));
  $$("[data-tel]").forEach((a) => (a.href = "tel:" + B.phoneIntl));
  $$("[data-maps]").forEach((a) => (a.href = B.mapsUrl));
  $$("[data-site]").forEach((a) => (a.href = B.website));
  $("#year").textContent = new Date().getFullYear();
  $("#schedule").innerHTML = B.schedule.map((s) => `<div class="sched"><span>${esc(s.days)}</span><span>${esc(s.hours)}</span></div>`).join("");

  /* runway + ticker */
  const models = D.photos.slice(0, 12).map((p) => `<figure class="model" data-tag="${esc(p.tag)}"><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="" width="400" height="500" loading="lazy"></figure>`).join("");
  $("#runway").innerHTML = models + models;
  const tick = [...D.stats.map((s) => `${s.value} ${s.label}`), "Câini", "Pisici", "Iepuri", "Str. Muncești 94", B.phone].map((x) => `<span>${esc(x)}</span>`).join("");
  $("#ticker").innerHTML = tick + tick;

  /* looks */
  const row = $("#looks-row");
  row.innerHTML = D.services.map((s, k) => `
    <article class="look ${k === 0 ? "is-active" : ""}" data-i="${k}">
      <span class="look__num" aria-hidden="true">${String(k + 1).padStart(2, "0")}</span>
      <figure><img data-photo="${esc(photo(k).tag)}" src="${U.photoPath(photo(k).src)}" alt="${esc(photo(k).alt)}" width="800" height="600" loading="lazy"></figure>
      <div class="look__body">
        <h3 class="look__name">${esc(s.name)}</h3><p class="look__sub">${esc(s.subtitle)}</p>
        <div class="look__row"><span class="look__price">${esc(U.priceLabel(s.price, s.unit, s.from))}</span><span class="look__dur">${esc(s.duration)}</span></div>
        <div class="look__more"><div><p>${esc(s.description)}</p><a class="btn btn--pink" href="${U.waLink(`Bună! Aș dori să rezerv: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener"><span>Rezervă acest look</span></a></div></div>
      </div>
    </article>`).join("");
  $("#dots").innerHTML = D.services.map((_, k) => `<i class="${k === 0 ? "is-on" : ""}"></i>`).join("");
  row.addEventListener("click", (e) => { if (e.target.closest("a")) return; const l = e.target.closest(".look"); if (l) l.classList.toggle("is-open"); });
  const looks = $$(".look"), dots = $$("#dots i");
  let rraf = 0;
  row.addEventListener("scroll", () => { if (rraf) return; rraf = requestAnimationFrame(() => { rraf = 0; const c = row.scrollLeft + row.clientWidth / 2; let best = 0, bd = 1e9; looks.forEach((l, k) => { const d = Math.abs(l.offsetLeft + l.offsetWidth / 2 - c); if (d < bd) { bd = d; best = k; } }); looks.forEach((l, k) => l.classList.toggle("is-active", k === best)); dots.forEach((d, k) => d.classList.toggle("is-on", k === best)); }); }, { passive: true });

  /* curtain + hold */
  const stage = $("#stage"), hold = $("#hold"), label = $("#stage-label");
  const before = (on) => { stage.classList.toggle("is-before", on); hold.setAttribute("aria-pressed", on); label.textContent = on ? "Înainte" : "După"; };
  ["pointerdown", "touchstart"].forEach((ev) => hold.addEventListener(ev, (e) => { e.preventDefault(); before(true); }, { passive: false }));
  ["pointerup", "pointercancel", "pointerleave", "touchend"].forEach((ev) => hold.addEventListener(ev, () => before(false)));
  hold.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); before(true); } });
  hold.addEventListener("keyup", () => before(false));

  /* jury */
  $("#jury").innerHTML = D.testimonials.map((q) => `
    <div class="card3d reveal"><button type="button" aria-label="Întoarce cartea: ${esc(q.name)}">
      <span class="face face--front"><span class="score">${q.rating * 2}/10</span><span><span class="name">${esc(q.name)}</span><span class="svc">${esc(q.service)}</span></span><span class="hint">Atinge pentru părere</span></span>
      <span class="face face--back"><p>${esc(q.text)}</p><footer>${esc(q.name)}</footer></span>
    </button></div>`).join("");
  $("#jury").addEventListener("click", (e) => { const c = e.target.closest(".card3d"); if (c) c.classList.toggle("is-flipped"); });

  /* backstage, flow, wall */
  $("#story").innerHTML = D.team.story.slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#creds").innerHTML = D.team.credentials.map((c) => `<li>${esc(c)}</li>`).join("");
  $("#process").insertAdjacentHTML("beforeend", D.process.map((p) => `<li class="reveal"><h4>${esc(p.step)}</h4><p>${esc(p.text)}</p></li>`).join(""));
  $("#gallery").innerHTML = D.photos.slice(0, 12).map((p) => `<figure class="tile reveal"><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="800" height="1000" loading="lazy"><figcaption>${esc(p.tag)}</figcaption></figure>`).join("");

  /* info */
  const acc = (items) => items.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#care-title").textContent = D.aftercare.title; $("#policies-title").textContent = D.policies.title;
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#3a291c", "#5a4130", "#e8c47c");

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  $$(".jury__grid, .wall__grid, .flow").forEach((g) => $$(".reveal", g).forEach((el, k) => (el.style.transitionDelay = Math.min(k * 70, 420) + "ms")));
  $$(".reveal").forEach((el) => io.observe(el));

  /* scroll engine: curtain, flow line, parallax */
  const flow = $(".flow"), fbar = $("#flow-bar"), par = $$("[data-parallax]");
  let raf = 0;
  const frame = () => {
    raf = 0; const vh = innerHeight;
    const r = stage.getBoundingClientRect(); const p = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.9 - r.top) / (vh * 0.55)));
    stage.style.setProperty("--p", p.toFixed(3));
    const fr = flow.getBoundingClientRect(); fbar.style.setProperty("--p", Math.min(1, Math.max(0, (vh * 0.85 - fr.top) / fr.height)).toFixed(3));
    if (!reduce) par.forEach((el) => { const rr = el.getBoundingClientRect(); el.style.transform = `translate3d(0,${(-(rr.top + rr.height / 2 - vh / 2) * parseFloat(el.dataset.parallax)).toFixed(1)}px,0)`; });
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true }); addEventListener("resize", frame); frame();

  /* spotlight */
  const spot = $("#spot");
  if (fine && !reduce) addEventListener("pointermove", (e) => { spot.style.setProperty("--mx", e.clientX + "px"); spot.style.setProperty("--my", e.clientY + "px"); }, { passive: true });
  else if (!reduce) { let t0 = performance.now(); const sweep = (t) => { const k = ((t - t0) / 6000) % 1; spot.style.setProperty("--mx", (20 + 60 * (0.5 + 0.5 * Math.sin(k * Math.PI * 2))) + "%"); requestAnimationFrame(sweep); }; requestAnimationFrame(sweep); }
})();
