/* ================= BRIXWAVE PORTAL — configurare ================= */
const BRIXWAVE = {
  name: "Brixwave",
  email: "brixwavetechnology@gmail.com",   // unde ajunge confirmarea clientului
  whatsapp: "",                            // ex: "407xxxxxxxx" (doar cifre). Gol → butonul WhatsApp e ascuns
  client: "Pet Expert (petexpert.md)",
  includes: [
    "Designul ales, personalizat cu fotografiile reale de pe Instagram, serviciile și prețurile salonului",
    "Toate secțiunile: servicii, estimator de preț, lucrări, echipă, păreri, întrebări frecvente, contact",
    "Programare rapidă prin WhatsApp, Viber și telefon, cu mesaj precompletat",
    "Mobile first: gândit pentru telefon, apoi adaptat la tabletă și desktop",
    "Animații și micro‑interacțiuni moderne, optimizate pentru performanță",
    "Optimizare SEO de bază (titluri, descrieri, viteză, accesibilitate)",
    "Publicare online și asistență la configurarea domeniului",
    "O rundă de modificări după livrare",
  ],
  steps: [
    ["Alegi designul", "din portal și trimiți cererea de ofertă prin e‑mail sau WhatsApp."],
    ["Primești oferta scrisă", "personalizată: preț, termen de livrare și pașii de plată."],
    ["Trimiți materialele", "fotografiile reale, lista finală de tratamente și prețuri, datele de contact."],
    ["Livrăm site-ul", "personalizat, testat pe telefon în primul rând, gata de publicat."],
  ],
};

const DESIGNS = [
  {
    id: "play",
    name: "Play",
    vibe: "Jucăuș · cald · ca o aplicație",
    path: "designs/01-play/index.html",
    desc: "Gândit pentru telefon ca o aplicație: bară de acțiuni fixă jos (WhatsApp, Sună, Preț), servicii pe segmente Câini / Pisici / Iepuri cu fișă în bottom‑sheet și un estimator de preț: alegi animalul, talia, blana și serviciul, vezi prețul și durata, iar cererea de programare pleacă precompletată pe WhatsApp.",
    tags: ["Baloo 2", "Coral & muștar", "Estimator preț", "Bottom-sheet"],
    swatches: ["#fff7ee", "#ff6b47", "#1f6f78"],
    motion: 3, warmth: 5, density: 4,
    audience: "Stăpâni care vor să afle rapid cât costă și să se programeze de pe telefon",
  },
  {
    id: "studio",
    name: "Studio",
    vibe: "Editorial · piatră & teracotă · revistă",
    path: "designs/02-studio/index.html",
    desc: "Copertă de revistă pentru un grooming studio: titlu uriaș „Tuns. Spălat. Iubit.”, fotografii cu arcade, tonuri de piatră și teracotă, DM Serif. Galerie tip colaj, carduri care se înclină la hover, sticker rotativ. Calm, premium, cu bară de acțiuni pe telefon.",
    tags: ["DM Serif Display", "Piatră & teracotă", "Grid colaj", "Sticker rotativ"],
    swatches: ["#f4efe7", "#c2603d", "#1c1b19"],
    motion: 3, warmth: 4, density: 3,
    audience: "Un salon care vrea să pară boutique, cu aer de revistă",
  },
  {
    id: "neon",
    name: "Neon",
    vibe: "Întunecat · navy & lime · energic",
    path: "designs/03-neon/index.html",
    desc: "Navy profund și un singur accent lime, tipografie Unbounded. Preloader cu numărătoare, „Expert” uriaș care intră literă cu literă, spotlight după cursor, serviciile ca carduri care se așază unul peste altul la scroll, citat care se aprinde cuvânt cu cuvânt, CTA gigantic la final.",
    tags: ["Unbounded", "Navy & lime", "Sticky stack", "Spotlight"],
    swatches: ["#0b1020", "#c6f24d", "#eef1ff"],
    motion: 5, warmth: 2, density: 3,
    audience: "Brand tânăr, îndrăzneț, activ pe Instagram",
  },
];

/* ================================================================== */
(function () {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const KEY = "brixwave.petexpert.choice";
  let chosen = null;
  try { chosen = localStorage.getItem(KEY); } catch (e) {}

  $("#year").textContent = new Date().getFullYear();
  const fm = $("#footer-mail"); fm.textContent = BRIXWAVE.email; fm.href = "mailto:" + BRIXWAVE.email;

  /* ---- cards ---- */
  $("#cards").innerHTML = DESIGNS.map((d, i) => `
    <article class="card reveal" data-id="${d.id}" style="transition-delay:${i * 90}ms">
      <div class="card__preview" data-open="${d.id}" role="button" tabindex="0" aria-label="Previzualizează ${esc(d.name)}">
        <span class="card__badge">${chosen === d.id ? "Alegerea ta" : "Varianta " + (i + 1)}</span>
        <iframe src="${d.path}" title="Preview ${esc(d.name)}" loading="lazy" tabindex="-1" aria-hidden="true"></iframe>
      </div>
      <div class="card__body">
        <div class="card__head">
          <div><h3 class="card__name">${esc(d.name)}</h3><p class="card__vibe">${esc(d.vibe)}</p></div>
          <div class="card__swatches" aria-hidden="true">${d.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</div>
        </div>
        <p class="card__desc">${esc(d.desc)}</p>
        <ul class="card__tags">${d.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
        <div class="card__actions">
          <button class="btn" data-open="${d.id}">Preview</button>
          <button class="btn btn--primary" data-choose="${d.id}">Aleg acest design</button>
        </div>
        <div class="card__price"><span>Ofertă personalizată</span><b>la cerere</b></div>
      </div>
    </article>`).join("");

  /* scale iframes to card width */
  const fit = () => $$(".card__preview").forEach((p) => { const f = $("iframe", p); if (f) f.style.transform = `scale(${p.clientWidth / 1440})`; });
  new ResizeObserver(fit).observe($("#cards")); fit();

  /* ---- compare table ---- */
  const meter = (n) => `<span class="meter" aria-hidden="true">${[1, 2, 3, 4, 5].map((i) => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</span>`;
  const rows = [
    ["Atmosferă", (d) => esc(d.vibe)],
    ["Paletă", (d) => `<span class="card__swatches" aria-hidden="true" style="display:inline-flex;vertical-align:middle;margin-right:8px">${d.swatches.map((c) => `<i style="background:${c}"></i>`).join("")}</span>${esc(d.tags[1])}`],
    ["Tipografie", (d) => esc(d.tags[0])],
    ["Intensitate animații", (d) => meter(d.motion) + ["", "discretă", "moderată", "vizibilă", "cinematică", "maximă"][d.motion]],
    ["Căldură vizuală", (d) => meter(d.warmth) + ["", "rece", "sobră", "echilibrată", "caldă", "foarte caldă"][d.warmth]],
    ["Element distinctiv", (d) => esc(d.tags[2]) + " · " + esc(d.tags[3])],
    ["Potrivit pentru", (d) => esc(d.audience)],
  ];
  $("#compare-table").innerHTML = `<thead><tr><th scope="col"></th>${DESIGNS.map((d) => `<th scope="col">${esc(d.name)}</th>`).join("")}</tr></thead>
    <tbody>${rows.map(([label, fn]) => `<tr><th scope="row">${label}</th>${DESIGNS.map((d) => `<td>${fn(d)}</td>`).join("")}</tr>`).join("")}</tbody>`;

  /* ---- offer ---- */
  $("#includes").innerHTML = BRIXWAVE.includes.map((x) => `<li>${esc(x)}</li>`).join("");
  $("#steps").innerHTML = BRIXWAVE.steps.map(([b, t]) => `<li><span><b>${esc(b)}</b> ${esc(t)}</span></li>`).join("");

  /* ---- viewer ---- */
  const viewer = $("#viewer"), frame = $("#viewer-frame"), stage = $("#viewer-stage");
  let current = null, lastFocus = null;
  const openViewer = (id) => {
    const d = DESIGNS.find((x) => x.id === id); if (!d) return;
    current = d; lastFocus = document.activeElement;
    $("#viewer-title").innerHTML = `${esc(d.name)}<small>${esc(d.vibe)}</small>`;
    $("#viewer-open").href = d.path; frame.src = d.path;
    viewer.hidden = false; document.body.style.overflow = "hidden"; $("#viewer-close").focus();
  };
  const closeViewer = () => { viewer.hidden = true; frame.src = "about:blank"; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
  $("#viewer-close").addEventListener("click", closeViewer);
  $("#viewer-choose").addEventListener("click", () => { closeViewer(); openModal(current.id); });
  $$(".seg").forEach((b) => b.addEventListener("click", () => {
    $$(".seg").forEach((x) => x.classList.toggle("is-on", x === b));
    stage.classList.toggle("is-mobile", b.dataset.device === "mobile");
  }));

  /* ---- choice modal ---- */
  const modal = $("#modal");
  const openModal = (id) => {
    const d = DESIGNS.find((x) => x.id === id); if (!d) return;
    chosen = d.id; try { localStorage.setItem(KEY, d.id); } catch (e) {}
    markChoice();
    $("#modal-title").textContent = d.name;
    $("#modal-desc").textContent = d.desc;
    $("#modal-includes").innerHTML = BRIXWAVE.includes.slice(0, 5).map((x) => `<li>${esc(x)}</li>`).join("");
    const msg = `Bună! Sunt de la ${BRIXWAVE.client}. Am ales designul „${d.name}” din portalul Brixwave și aș dori o ofertă pentru realizarea site-ului. Mulțumesc!`;
    $("#modal-mail").href = `mailto:${BRIXWAVE.email}?subject=${encodeURIComponent(`[${BRIXWAVE.client}] Design ales: ${d.name}`)}&body=${encodeURIComponent(msg)}`;
    const wa = $("#modal-wa");
    if (BRIXWAVE.whatsapp) { wa.hidden = false; wa.href = `https://wa.me/${BRIXWAVE.whatsapp}?text=${encodeURIComponent(msg)}`; } else wa.hidden = true;
    lastFocus = document.activeElement; modal.hidden = false; document.body.style.overflow = "hidden"; $("#modal-close").focus();
  };
  const closeModal = () => { modal.hidden = true; document.body.style.overflow = ""; lastFocus && lastFocus.focus(); };
  $("#modal-close").addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  addEventListener("keydown", (e) => { if (e.key === "Escape") { if (!modal.hidden) closeModal(); else if (!viewer.hidden) closeViewer(); } });

  function markChoice() {
    $$(".card").forEach((c, i) => {
      const on = c.dataset.id === chosen; c.classList.toggle("is-chosen", on);
      $(".card__badge", c).textContent = on ? "Alegerea ta" : "Varianta " + (i + 1);
      $("[data-choose]", c).textContent = on ? "Ales · cere oferta" : "Aleg acest design";
    });
    const hint = $("#offer-hint"), d = DESIGNS.find((x) => x.id === chosen);
    hint.classList.toggle("is-chosen", !!d);
    hint.textContent = d ? `Ai ales „${d.name}”. Trimite cererea din card pentru a primi oferta.` : "Alege un design mai sus, apoi trimite cererea.";
  }
  markChoice();

  /* ---- delegated actions ---- */
  document.addEventListener("click", (e) => {
    const o = e.target.closest("[data-open]"), c = e.target.closest("[data-choose]");
    if (o) openViewer(o.dataset.open); else if (c) openModal(c.dataset.choose);
  });
  document.addEventListener("keydown", (e) => {
    const o = e.target.closest && e.target.closest(".card__preview[data-open]");
    if (o && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openViewer(o.dataset.open); }
  });

  /* ---- reveals ---- */
  const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } }), { threshold: 0.1 });
  $$(".reveal").forEach((el) => io.observe(el));
  requestAnimationFrame(() => setTimeout(() => $(".hero").classList.add("is-in"), 60));
})();
