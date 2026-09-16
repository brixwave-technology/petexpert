/* BARBERSHOP — script */
(function () {
  const D = window.PETEXPERT, U = D.util, B = D.brand;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  $("#neon-hours").textContent = B.schedule[0].days + " " + B.schedule[0].hours;

  /* stripe marquee */
  const items = ["Frizerie pentru câini", "Pisici", "Iepuri", B.address, B.phone, ...D.stats.map((s) => `${s.value} ${s.label}`)].map((x) => `<span>${esc(x)}</span>`).join("");
  $("#stripe").innerHTML = items + items;

  /* chalkboard menu */
  $("#services").innerHTML = D.services.map((s, k) => `
    <li class="row reveal" style="transition-delay:${k * 80}ms">
      <button class="row__head" aria-expanded="false">
        <span class="row__name">${esc(s.name)}</span><span class="row__dots" aria-hidden="true"></span><span class="row__price">${esc(U.priceLabel(s.price, null, s.from))}</span>
        <span class="row__sub">${esc(s.subtitle)}${s.unit ? " · " + esc(s.unit) : ""}</span>
      </button>
      <div class="row__body"><div><p>${esc(s.description)}</p><div class="row__meta"><span>${esc(s.duration)}</span>${s.sessions ? `<span>${esc(s.sessions)}</span>` : ""}<a class="btn btn--brass" href="${U.waLink(`Bună! Aș dori o programare la Pet Expert pentru: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener">Programează</a></div></div></div>
    </li>`).join("");
  $("#services").addEventListener("click", (e) => { if (e.target.closest("a")) return; const h = e.target.closest(".row__head"); if (!h) return; const o = h.parentElement.classList.toggle("is-open"); h.setAttribute("aria-expanded", o); });

  /* mirror */
  const mir = $("#mir"), range = $("#mir-range");
  const setX = (v) => mir.style.setProperty("--x", v + "%"); range.addEventListener("input", () => setX(range.value)); setX(50);
  const fit = () => { $("#mir-before img").style.width = mir.clientWidth + "px"; }; addEventListener("resize", fit); fit();

  /* photo booth strips (3 photos each) */
  const strips = []; for (let k = 0; k < 12; k += 3) strips.push(D.photos.slice(k, k + 3));
  $("#gallery").innerHTML = strips.map((g, k) => `<div class="strip reveal" style="--rot:${[-2, 1.5, -1, 2][k % 4]}deg">${g.map((p) => `<figure><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="600" height="600" loading="lazy"><figcaption>${esc(p.tag)}</figcaption></figure>`).join("")}<span class="strip__label">Pet Expert · ${new Date().getFullYear()}</span></div>`).join("");

  /* rules, ticket */
  $("#process").innerHTML = D.process.map((p) => `<li class="reveal"><div><h3>${esc(p.step)}</h3><p>${esc(p.text)}</p></div></li>`).join("");
  const no = 400 + Math.floor(Math.random() * 500); $("#ticket-no").textContent = String(no).padStart(4, "0");
  $("#tear").addEventListener("click", () => { $("#ticket").classList.add("is-torn"); $("#ticket-go").hidden = false; $("#ticket-go").href = U.waLink(`Bună! Am „rupt” biletul nr. ${no} de pe site și aș dori o programare la Pet Expert. Când aveți un loc liber?`); setTimeout(() => $("#ticket-go").focus(), 300); });

  /* guest book, team */
  $("#quotes").innerHTML = D.testimonials.map((q) => `<article class="entry reveal"><p>„${esc(q.text)}”</p><footer><span>— ${esc(q.name)}, ${esc(q.service)}</span><span class="stars" aria-label="${q.rating} din 5">${"★".repeat(q.rating || 5)}</span></footer></article>`).join("");
  $("#story").innerHTML = D.team.story.slice(0, 3).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#stats").innerHTML = D.stats.map((s) => `<li class="reveal"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");

  /* info */
  const acc = (list) => list.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#tabs").innerHTML = [["faq", "Întrebări"], ["care", D.aftercare.title], ["policies", D.policies.title]].map(([id, l], k) => `<button role="tab" class="${k === 0 ? "is-on" : ""}" aria-selected="${k === 0}" data-id="${id}">${esc(l)}</button>`).join("");
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$("#tabs button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); }); $$(".acc").forEach((a) => a.classList.toggle("is-on", a.id === b.dataset.id)); });
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#1b4d3e", "#6a4225", "#c9a24a");

  /* reveals (chalk rows write themselves when the board is in view) */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  $$(".booth__row, .plates, .page, .stats").forEach((g) => $$(".reveal", g).forEach((el, k) => (el.style.transitionDelay = Math.min(k * 80, 480) + "ms")));
  $$(".reveal, #chalk").forEach((el) => io.observe(el));
})();
