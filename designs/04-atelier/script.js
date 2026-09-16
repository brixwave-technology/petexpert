/* ATELIER — script */
(function () {
  const D = window.PETEXPERT, U = D.util, B = D.brand;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const photo = (i) => D.photos[i % 12];

  $$("[data-brand]").forEach((el) => (el.textContent = B[el.dataset.brand] || ""));
  $$("[data-founder]").forEach((el) => (el.textContent = D.team[el.dataset.founder] || ""));
  $$("[data-wa]").forEach((a) => (a.href = U.waLink()));
  $$("[data-ig]").forEach((a) => (a.href = B.instagramUrl));
  $$("[data-tel]").forEach((a) => (a.href = "tel:" + B.phoneIntl));
  $$("[data-maps]").forEach((a) => (a.href = B.mapsUrl));
  $$("[data-site]").forEach((a) => (a.href = B.website));
  $("#year").textContent = new Date().getFullYear();
  $("#schedule").innerHTML = B.schedule.map((s) => `<div class="sched"><span>${esc(s.days)}</span><span>${esc(s.hours)}</span></div>`).join("");

  /* services */
  $("#services").innerHTML = D.services.map((s, k) => `
    <li class="item reveal" data-i="${k}">
      <button class="item__head" aria-expanded="false">
        <span class="item__no">${String(k + 1).padStart(2, "0")}</span>
        <span class="item__name">${esc(s.name)}</span>
        <span class="item__price">${esc(U.priceLabel(s.price, s.unit, s.from))}</span>
        <span class="item__sub">${esc(s.subtitle)}</span>
      </button>
      <div class="item__body"><div><div class="item__inner">
        <figure class="item__thumb"><img data-photo="${esc(photo(k).tag)}" src="${U.photoPath(photo(k).src)}" alt="" width="800" height="450" loading="lazy"></figure>
        <div><p>${esc(s.description)}</p><div class="item__meta"><span>${esc(s.duration)}</span>${s.sessions ? `<span>${esc(s.sessions)}</span>` : ""}<a class="link" href="${U.waLink(`Bună! Aș dori o programare la Pet Expert pentru: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener">Programează</a></div></div>
      </div></div></div>
    </li>`).join("");
  $("#services").addEventListener("click", (e) => { if (e.target.closest("a")) return; const h = e.target.closest(".item__head"); if (!h) return; const o = h.parentElement.classList.toggle("is-open"); h.setAttribute("aria-expanded", o); });
  // cursor-following preview on desktop
  const ci = $("#cursor-img"), cimg = $("img", ci);
  if (fine && !reduce) {
    let cx = 0, cy = 0, tx = 0, ty = 0, on = false;
    $$(".item").forEach((li) => {
      li.addEventListener("pointerenter", () => { const p = photo(+li.dataset.i); cimg.src = U.photoPath(p.src); ci.classList.add("is-on"); on = true; });
      li.addEventListener("pointerleave", () => { ci.classList.remove("is-on"); on = false; });
    });
    addEventListener("pointermove", (e) => { tx = e.clientX + 140; ty = e.clientY; }, { passive: true });
    (function loop() { cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18; if (on) ci.style.left = cx + "px", ci.style.top = cy + "px"; requestAnimationFrame(loop); })();
  }

  /* lookbook */
  const row = $("#gallery");
  row.innerHTML = D.photos.slice(0, 12).map((p, k) => `<article class="look"><figure><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="800" height="1000" loading="lazy"></figure><figcaption><em>${esc(p.tag)}</em><span>${String(k + 1).padStart(2, "0")}</span></figcaption></article>`).join("");
  const bar = $("#lb-bar"), count = $("#lb-count");
  const upd = () => { const max = row.scrollWidth - row.clientWidth; const p = max ? row.scrollLeft / max : 0; bar.style.transform = `scaleX(${0.08 + 0.92 * p})`; count.textContent = `${String(1 + Math.round(p * 11)).padStart(2, "0")} / 12`; };
  row.addEventListener("scroll", upd, { passive: true }); upd();

  /* before/after hold */
  const ba = $("#ba"), hold = $("#hold"), label = $("#ba-label");
  const set = (on) => { ba.classList.toggle("is-before", on); hold.setAttribute("aria-pressed", on); label.textContent = on ? "Înainte" : "După"; };
  [hold, ba].forEach((el) => { ["pointerdown", "touchstart"].forEach((ev) => el.addEventListener(ev, (e) => { if (ev === "touchstart") e.preventDefault(); set(true); }, { passive: false })); ["pointerup", "pointercancel", "pointerleave", "touchend"].forEach((ev) => el.addEventListener(ev, () => set(false))); });
  hold.addEventListener("keydown", (e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); set(true); } }); hold.addEventListener("keyup", () => set(false));

  /* values, steps, team */
  $("#values").innerHTML = D.team.values.map((v) => `<li class="reveal"><h3>${esc(v.title)}</h3><p>${esc(v.text)}</p></li>`).join("");
  $("#process").innerHTML = D.process.map((p, k) => `<li class="reveal"><i>${String(k + 1).padStart(2, "0")}</i><div><h3>${esc(p.step)}</h3><p>${esc(p.text)}</p></div></li>`).join("");
  $("#story").innerHTML = D.team.story.slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#creds").innerHTML = D.team.credentials.map((c) => `<li>${esc(c)}</li>`).join("");
  $("#stats").innerHTML = D.stats.map((s) => `<li class="reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");

  /* quotes rotator */
  const stage = $("#quotes"), qnav = $("#qnav");
  stage.innerHTML = D.testimonials.map((q, k) => `<blockquote class="q ${k === 0 ? "is-active" : ""}"><p>„${esc(q.text)}”</p><footer><b>${esc(q.name)}</b> · ${esc(q.service)}</footer></blockquote>`).join("");
  qnav.innerHTML = D.testimonials.map((_, k) => `<button role="tab" aria-selected="${k === 0}" aria-label="Părerea ${k + 1}"></button>`).join("");
  let qi = 0, timer; const show = (n) => { qi = (n + D.testimonials.length) % D.testimonials.length; $$(".q", stage).forEach((q, k) => q.classList.toggle("is-active", k === qi)); $$("button", qnav).forEach((b, k) => b.setAttribute("aria-selected", k === qi)); };
  const arm = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(qi + 1), 6500); };
  $$("button", qnav).forEach((b, k) => b.addEventListener("click", () => { show(k); arm(); })); arm();

  /* info */
  const acc = (items) => items.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#care-title").textContent = D.aftercare.title; $("#policies-title").textContent = D.policies.title;
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#f4ead8", "#ebdfc8", "#2a1d14");

  /* reveals: masks, draws, contact lines */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.15 });
  $$(".list, .phil__list, .steps__list, .stats").forEach((g) => $$(".reveal", g).forEach((el, k) => (el.style.transitionDelay = Math.min(k * 70, 420) + "ms")));
  $$(".reveal, .mask, .h2.draw, .contact__title").forEach((el) => io.observe(el));
  requestAnimationFrame(() => setTimeout(() => $(".hero__img").classList.add("is-in"), 120));

  /* magnetic */
  if (fine && !reduce) $$("[data-magnetic]").forEach((btn) => { btn.addEventListener("pointermove", (e) => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * .18).toFixed(1)}px,${((e.clientY - r.top - r.height / 2) * .28).toFixed(1)}px)`; }); btn.addEventListener("pointerleave", () => (btn.style.transform = "")); });
})();
