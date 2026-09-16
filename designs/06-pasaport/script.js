/* PAȘAPORT — script */
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
  $("#pass-date").textContent = new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "short", year: "numeric" });

  /* live open/closed from schedule */
  const now = new Date(), dow = now.getDay(), mins = now.getHours() * 60 + now.getMinutes();
  const parse = (h) => { const m = h.match(/(\d{2}):(\d{2})\s*–\s*(\d{2}):(\d{2})/); return m ? [+m[1] * 60 + +m[2], +m[3] * 60 + +m[4]] : null; };
  const todayRow = dow >= 1 && dow <= 5 ? B.schedule[0] : dow === 6 ? B.schedule[1] : B.schedule[2];
  const range = parse(todayRow.hours); const open = range && mins >= range[0] && mins < range[1];
  $("#live").classList.toggle("is-closed", !open); $("#live-text").textContent = open ? `Deschis acum · până la ${todayRow.hours.split("–")[1].trim()}` : "Închis acum";
  $("#schedule").innerHTML = B.schedule.map((s, k) => `<div class="sched ${s === todayRow ? "is-today" : ""}"><span>${esc(s.days)}</span><span>${esc(s.hours)}</span></div>`).join("");
  $("#next-open").textContent = open ? "Ultimele programări se fac cu 1h înainte de închidere." : (dow === 0 ? "Deschidem luni la " + B.schedule[0].hours.split("–")[0].trim() + "." : range && mins < range[0] ? "Deschidem azi la " + todayRow.hours.split("–")[0].trim() + "." : "Deschidem mâine la " + (dow === 5 ? B.schedule[1] : B.schedule[0]).hours.split("–")[0].trim() + ".");

  /* stats, photos, services */
  $("#stats").innerHTML = D.stats.map((s) => `<li><b>${esc(s.value)}</b><span>${esc(s.label)}</span></li>`).join("");
  const ph = (i) => `<img data-photo="${esc(photo(i).tag)}" src="${U.photoPath(photo(i).src)}" alt="${esc(photo(i).alt)}" width="800" height="1000" loading="lazy"><figcaption class="mono">${esc(photo(i).tag)}</figcaption>`;
  $("#photo-a").innerHTML = ph(2); $("#photo-b").innerHTML = ph(4);
  $("#services").innerHTML = D.services.map((s) => `<li><button aria-expanded="false"><span class="n">${esc(s.name)}</span><span class="p">${esc(U.priceLabel(s.price, null, s.from))}</span><span class="s">${esc(s.subtitle)}</span></button><div class="d"><div><p>${esc(s.description)}</p><a class="link" href="${U.waLink(`Bună! Aș dori o programare la Pet Expert pentru: ${s.name}. Când aveți un loc liber?`)}" target="_blank" rel="noopener">Programează →</a></div></div></li>`).join("");
  $("#services").addEventListener("click", (e) => { if (e.target.closest("a")) return; const b = e.target.closest("button"); if (!b) return; const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); });

  /* passport */
  const pass = $(".pass"); $("#pass-open").addEventListener("click", () => pass.classList.add("is-open"));
  const st = { species: null, size: null, coat: null, service: null };
  const btn = (id, label, small, on) => `<button type="button" data-id="${id}" class="${on ? "is-on" : ""}" aria-pressed="${on}">${esc(label)}${small ? `<small>${esc(small)}</small>` : ""}</button>`;
  const render = () => {
    $("#opt-species").innerHTML = D.serviceGroups.map((g) => btn(g.id, g.name, null, st.species === g.id)).join("");
    const dogs = st.species === "caini"; $("#row-size").hidden = !dogs;
    $("#opt-size").innerHTML = D.sizes.map((s) => btn(s.id, s.name, s.note.split("·")[0].trim(), st.size === s.id)).join("");
    $("#opt-coat").innerHTML = D.coats.map((c) => btn(c.id, c.name, null, st.coat === c.id)).join("");
    const svc = st.species ? D.services.filter((s) => s.group === st.species) : D.services;
    if (st.service && !svc.find((s) => s.id === st.service)) st.service = null;
    $("#opt-service").innerHTML = svc.map((s) => btn(s.id, s.name, s.duration, st.service === s.id)).join("");
    // stamps
    const stamps = [];
    if (st.species) stamps.push(`<span class="stamp" style="--rot:-8deg">${esc(D.serviceGroups.find((g) => g.id === st.species).short)}<b>✔ admis</b></span>`);
    if (dogs && st.size) stamps.push(`<span class="stamp stamp--blue" style="--rot:4deg">${esc(D.sizes.find((s) => s.id === st.size).name)}</span>`);
    if (st.coat) stamps.push(`<span class="stamp stamp--blue" style="--rot:-3deg">${esc(D.coats.find((c) => c.id === st.coat).name)}</span>`);
    if (st.service) stamps.push(`<span class="stamp" style="--rot:6deg">${esc(D.services.find((s) => s.id === st.service).name)}<b>${new Date().toLocaleDateString("ro-RO")}</b></span>`);
    const box = $("#stamps"); const prev = box.children.length; box.innerHTML = stamps.length ? stamps.join("") : `<span class="mono">Ștampilele apar aici pe măsură ce alegi.</span>`;
    // keep animation only for the newest stamp
    Array.from(box.children).forEach((c, k) => { if (k < prev) c.style.animation = "none"; });
    // estimate
    const s = st.service ? D.services.find((x) => x.id === st.service) : null;
    if (s && s.price) { const f = (dogs && st.size ? D.sizes.find((x) => x.id === st.size).factor : 1) * (st.coat ? D.coats.find((x) => x.id === st.coat).factor : 1); const lo = Math.round(s.price * f / 10) * 10, hi = Math.round(s.price * f * 1.25 / 10) * 10; $("#pass-price").textContent = `${lo}–${hi} lei`; $("#pass-dur").textContent = s.duration; }
    else { $("#pass-price").textContent = s ? "la cerere" : "—"; $("#pass-dur").textContent = s ? s.duration : "—"; }
    const parts = [st.species && D.serviceGroups.find((g) => g.id === st.species).name, dogs && st.size && D.sizes.find((x) => x.id === st.size).name, st.coat && D.coats.find((x) => x.id === st.coat).name, s && s.name].filter(Boolean).join(", ");
    $("#pass-go").href = U.waLink(parts ? `Bună! Pașaportul de grooming de pe site: ${parts}. Estimare: ${$("#pass-price").textContent}, ${$("#pass-dur").textContent}. Când aveți un loc liber?` : undefined);
  };
  render();
  $(".pass__page").addEventListener("click", (e) => { const b = e.target.closest("button[data-id]"); if (!b) return; const row = b.parentElement.id.replace("opt-", ""); st[row] = st[row] === b.dataset.id ? null : b.dataset.id; if (row === "species") st.service = null; render(); });

  /* quotes */
  const stage = $("#quotes"), qnav = $("#qnav");
  stage.innerHTML = D.testimonials.map((q, k) => `<blockquote class="q ${k === 0 ? "is-active" : ""}"><p>„${esc(q.text)}”</p><footer>${esc(q.name)} · ${esc(q.service)}</footer></blockquote>`).join("");
  qnav.innerHTML = D.testimonials.map((_, k) => `<button aria-selected="${k === 0}" aria-label="Părerea ${k + 1}"></button>`).join("");
  let qi = 0, timer; const show = (n) => { qi = (n + D.testimonials.length) % D.testimonials.length; $$(".q", stage).forEach((q, k) => q.classList.toggle("is-active", k === qi)); $$("button", qnav).forEach((b, k) => b.setAttribute("aria-selected", k === qi)); };
  const arm = () => { clearInterval(timer); if (!reduce) timer = setInterval(() => show(qi + 1), 6000); };
  $$("button", qnav).forEach((b, k) => b.addEventListener("click", () => { show(k); arm(); })); arm();

  /* gallery, team, process */
  $("#gallery").innerHTML = D.photos.slice(0, 12).map((p) => `<figure><img data-photo="${esc(p.tag)}" src="${U.photoPath(p.src)}" alt="${esc(p.alt)}" width="600" height="600" loading="lazy"><figcaption>${esc(p.tag)}</figcaption></figure>`).join("");
  $("#story").innerHTML = D.team.story.slice(0, 2).map((p) => `<p>${esc(p)}</p>`).join("");
  $("#creds").innerHTML = D.team.credentials.slice(0, 4).map((c) => `<li>${esc(c)}</li>`).join("");
  $("#process").innerHTML = D.process.map((p) => `<li><div><h3>${esc(p.step)}</h3><p>${esc(p.text)}</p></div></li>`).join("");

  /* info */
  const acc = (items) => items.map((x) => `<div class="ai"><button aria-expanded="false"><span>${esc(x.q || x.title)}</span><i aria-hidden="true"></i></button><div class="a"><div><p>${esc(x.a || x.text)}</p></div></div></div>`).join("");
  $("#faq").innerHTML = acc(D.faq); $("#care").innerHTML = acc(D.aftercare.tips); $("#policies").innerHTML = acc(D.policies.items);
  $("#tabs").innerHTML = [["faq", "Întrebări"], ["care", D.aftercare.title], ["policies", D.policies.title]].map(([id, l], k) => `<button role="tab" class="${k === 0 ? "is-on" : ""}" aria-selected="${k === 0}" data-id="${id}">${esc(l)}</button>`).join("");
  $("#tabs").addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return; $$("#tabs button").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", x === b); }); $$(".acc").forEach((a) => a.classList.toggle("is-on", a.id === b.dataset.id)); });
  document.addEventListener("click", (e) => { const b = e.target.closest(".ai button"); if (b) { const o = b.parentElement.classList.toggle("is-open"); b.setAttribute("aria-expanded", o); } });

  U.bindPlaceholders("#f4ead8", "#eadcc2", "#2a1d14");

  /* tiles spring in */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.08 });
  $$(".t-in").forEach((el, k) => { el.style.transitionDelay = Math.min((k % 4) * 90, 270) + "ms"; io.observe(el); });
})();
