/* PAPERCUT — script */
(function () {
  const D = window.PETEXPERT, U = D.util, B = D.brand;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const photo = (i) => D.photos[i % 12];
  const rots = [-2, 1.5, -1, 2, -1.5, 1, 2.5, -2.5];

  $$("[data-brand]").forEach((el) => (el.textContent = B[el.dataset.brand] || ""));
  $$("[data-founder]").forEach((el) => (el.textContent = D.team[el.dataset.founder] || ""));
  $$("[data-wa]").forEach((a) => (a.href = U.waLink()));
  $$("[data-ig]").forEach((a) => (a.href = B.instagramUrl));
  $$("[data-tel]").forEach((a) => (a.href = "tel:" + B.phoneIntl));
  $$("[data-maps]").forEach((a) => (a.href = B.mapsUrl));
  $$("[data-site]").forEach((a) => (a.href = B.website));
  $("#year").textContent = new Date().getFullYear();
  $("#schedule").innerHTML = B.schedule.map((s) => `<div class="sched"><span>${esc(s.days)}</span><span>${esc(s.hours)}</span></div>`).join("");

  /* cards */
  $("#services").innerHTML = D.services.map((s, k) => `
    <button class="card reveal" type="button" aria-expanded="false" style="transition-delay:${k * 60}ms">
      <figure><img data-photo="${esc(photo(k).tag)}" src="${U.photoPath(photo(k).src)}" alt="" width="400" height="400" loading="lazy"></figure>
      <div class="card__body"><div class="card__name">${esc(s.name)}</div><div class="card__price">${esc(U.priceLabel(s.price, s.unit, s.from))}</div></div>
      <i class="card__fold" aria-hidden="true"></i>
      <div class="card__more"><p>${esc(s.description)}</p><div><div class="meta">${esc(s.duration)}${s.sessions ? " · " + esc(s.sessions) : ""}</div><a class="btn btn--brown" href="${U.waLink(`Bună! Aș dori o programare la Pet Expert pentru: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener">Programează</a></div></div>
    </button>`).join("");
  $("#services").addEventListener("click", (e) => { if (e.target.closest("a")) return; const c = e.target.closest(".card"); if (!c) return; const o = c.classList.toggle("is-open"); c.setAttribute("aria-expanded", o); });

  /* rip slider */
  const rip = $("#rip"), range = $("#rip-range");
  const setX = (v) => rip.style.setProperty("--x", v + "%"); range.addEventListener("input", () => setX(range.value)); setX(50);
  const fit = () => { $("#rip-before img").style.width = rip.clientWidth + "px"; }; addEventListener("resize", fit); fit();

  /* gallery, chain, notes, team */
  $("#gallery").innerHTML = D.photos.slice(0, 12).map((p, k) => `<figure class="frame reveal" style="--rot:${rots[k % 8]}deg"><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="800" height="1000" loading="lazy"><figcaption>${esc(p.tag)}</figcaption></figure>`).join("");
  $("#process").innerHTML = D.process.map((p) => `<li class="reveal"><h3>${esc(p.step)}</h3><p>${esc(p.text)}</p></li>`).join("");
  $("#quotes").innerHTML = D.testimonials.map((q, k) => `<article class="note reveal" style="--rot:${rots[(k + 2) % 8] / 1.5}deg"><p>„${esc(q.text)}”</p><footer><span>${esc(q.name)} · ${esc(q.service)}</span><span class="stars" aria-label="${q.rating} din 5">${"★".repeat(q.rating || 5)}</span></footer></article>`).join("");
  $("#story").innerHTML = D.team.story.slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats.map((s) => `<li class="reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");

  /* info */
  const acc = (items) => items.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#tabs").innerHTML = [["faq", "Întrebări"], ["care", D.aftercare.title], ["policies", D.policies.title]].map(([id, l], k) => `<button role="tab" class="${k === 0 ? "is-on" : ""}" aria-selected="${k === 0}" data-id="${id}">${esc(l)}</button>`).join("");
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$("#tabs button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); }); $$(".acc").forEach((a) => a.classList.toggle("is-on", a.id === b.dataset.id)); });
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#f4ead8", "#eadcc2", "#3a2718");

  /* reveals */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  $$(".frames, .chain, .notes, .stats").forEach((g) => $$(".reveal", g).forEach((el, k) => (el.style.transitionDelay = Math.min(k * 60, 360) + "ms")));
  $$(".reveal").forEach((el) => io.observe(el));

  /* parallax layers */
  const layers = $$(".ly"); let raf = 0;
  const frame = () => { raf = 0; const y = scrollY; layers.forEach((l) => { l.style.transform = `translate3d(0,${(-y * parseFloat(l.dataset.speed)).toFixed(1)}px,0) rotate(${(y * parseFloat(l.dataset.speed) * 0.05).toFixed(2)}deg)`; }); };
  if (!reduce) { addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(frame); }, { passive: true }); frame(); }
})();
