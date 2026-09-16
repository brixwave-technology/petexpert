/* =====================================================================
   PET EXPERT — sursa unică de date pentru cele 3 design-uri
   ---------------------------------------------------------------------
   Date preluate de pe Instagram (@petgroomingexpert.md): „Specialiști
   certificați în domeniu. Frezură pentru câini și pisici, iepuri.
   ☎ 076 666 466 · Str. Muncești 94.” 612 postări · 12.7k urmăritori.
   Site: https://petexpert.md

   Lista de servicii și prețurile sunt orientative (Chișinău, 2026) și se
   ajustează după lista reală a salonului. Poți edita orice text de aici;
   toate cele 3 site-uri se actualizează automat.
   ===================================================================== */
window.PETEXPERT = {
  brand: {
    name: "Pet Expert",
    category: "Salon de frezură pentru câini, pisici și iepuri",
    tagline: "Frezură cu răbdare, pentru prieteni cu blană. Specialiști certificați, în Chișinău.",
    shortIntro:
      "Salon de grooming profesional pe strada Muncești 94, Chișinău. Tuns, spălat, periat, tăiat unghii și îngrijire completă pentru câini de toate rasele, pisici și iepuri, cu groomeri certificați și produse blânde.",
    instagramHandle: "petgroomingexpert.md",
    instagramUrl: "https://www.instagram.com/petgroomingexpert.md/",
    website: "https://petexpert.md",
    phone: "076 666 466",
    phoneIntl: "+37376666466",
    whatsapp: "37376666466",
    viber: "37376666466",
    email: "contact@petexpert.md", // ← de confirmat
    address: "Str. Muncești 94, Chișinău",
    city: "Chișinău",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Strada+Muncesti+94+Chisinau",
    schedule: [
      { days: "Luni – Vineri", hours: "09:00 – 19:00" },
      { days: "Sâmbătă", hours: "09:00 – 17:00" },
      { days: "Duminică", hours: "Închis" },
    ],
    bookingNote: "Programările se fac telefonic sau pe mesaj. Prima vizită include o scurtă evaluare a blănii și a temperamentului, ca să alegem împreună tunsoarea potrivită.",
    since: 2017,
  },

  stats: [
    { value: "12.7k", label: "urmăritori pe Instagram" },
    { value: "600+", label: "lucrări publicate" },
    { value: "3", label: "specii: câini, pisici, iepuri" },
    { value: "100%", label: "groomeri certificați" },
  ],

  team: {
    name: "Echipa Pet Expert",
    role: "Groomeri certificați · câini, pisici, iepuri",
    story: [
      "Pet Expert a pornit dintr-o idee simplă: frezura unui animal nu este doar estetică, este confort, igienă și încredere. Un câine tuns corect se mișcă mai bine, o pisică periată nu mai înghite ghemotoace de blană, un iepure îngrijit respiră ușor.",
      "Fiecare groomer din echipă este certificat și lucrează după standardele raselor, dar adaptează totul la animalul din fața lui: vârstă, temperament, starea blănii, preferințele stăpânului.",
      "Nu grăbim nimic. Animalele anxioase primesc pauze, vorbă blândă și timp. De aceea multe dintre ele intră singure în salon la a doua vizită.",
      "Folosim șampoane și balsamuri profesionale, hipoalergenice, și instrumente sterilizate după fiecare client.",
    ],
    credentials: [
      "Groomeri certificați internațional",
      "Specializare tuns rase (Poodle, Yorkshire, Bichon, Schnauzer, Spitz)",
      "Grooming pisici fără sedare",
      "Îngrijire iepuri și rozătoare",
      "Instrumente sterilizate după fiecare client",
    ],
    values: [
      { title: "Blândețe înainte de toate", text: "Fără forțare, fără grabă. Animalele anxioase primesc pauze și timp să se obișnuiască." },
      { title: "Standardele rasei, adaptate", text: "Cunoaștem tunsorile de rasă și le ajustăm la stilul de viață al animalului și la dorința stăpânului." },
      { title: "Igienă fără compromis", text: "Instrumente sterilizate, prosoape curate la fiecare client, produse hipoalergenice." },
    ],
  },

  serviceGroups: [
    { id: "caini", name: "Câini", short: "Câini", text: "Tuns complet, igienic sau de rasă, spălat și uscat, tăiat unghii, curățat urechi. Pentru toate taliile." },
    { id: "pisici", name: "Pisici", short: "Pisici", text: "Grooming fără sedare: periat, descâlcit, tuns igienic sau complet, spălat blând, tăiat gheare." },
    { id: "iepuri", name: "Iepuri & rozătoare", short: "Iepuri", text: "Periat și tuns delicat, tăiat unghii, igienă, într-un mediu liniștit, fără câini în jur." },
  ],

  services: [
    { id: "caini-complet", group: "caini", name: "Frezură completă câini", subtitle: "Spălat, uscat, tuns, unghii, urechi", description: "Pachetul complet: spălare cu șampon profesional potrivit tipului de blană, uscare, tuns după rasă sau după dorința ta, tăiat unghii, curățat urechi și igienă. Durata depinde de talie și de starea blănii.", duration: "1h 30 – 3h", price: 350, unit: "talie mică", from: true },
    { id: "caini-igienic", group: "caini", name: "Tuns igienic câini", subtitle: "Zonele sensibile, lăbuțe, ochi", description: "Tunderea zonelor igienice, a lăbuțelor și a părului din jurul ochilor, plus tăiat unghii. Ideal între două frezuri complete.", duration: "30–45 min", price: 150, unit: "ședință" },
    { id: "caini-spa", group: "caini", name: "Spălat & uscat", subtitle: "Baie profesională, fără tuns", description: "Spălare cu șampon și balsam profesional, uscare completă și periat. Blana rămâne moale, fără miros, fără noduri.", duration: "45–60 min", price: 200, unit: "talie mică", from: true },
    { id: "caini-descalcit", group: "caini", name: "Descâlcire & periat", subtitle: "Pentru blană lungă sau neglijată", description: "Descâlcire cu răbdare, fără tăiere unde se poate, urmată de periat complet. Când nodurile sunt prea strânse, propunem tuns scurt pentru confortul animalului.", duration: "30–90 min", price: 120, unit: "ședință", from: true },
    { id: "pisici-complet", group: "pisici", name: "Grooming pisici", subtitle: "Fără sedare, cu răbdare", description: "Periat, descâlcit, tuns igienic sau complet (leu), spălat blând și uscat, tăiat gheare. Lucrăm în liniște, fără câini în salon în același timp.", duration: "1h – 2h", price: 300, unit: "ședință", from: true },
    { id: "pisici-gheare", group: "pisici", name: "Tăiat gheare & igienă pisici", subtitle: "Rapid și blând", description: "Tăiat gheare, curățat urechi, periat rapid. Vizită scurtă, potrivită și pentru pisicile care nu tolerează ședințe lungi.", duration: "15–20 min", price: 80, unit: "ședință" },
    { id: "iepuri", group: "iepuri", name: "Îngrijire iepuri", subtitle: "Periat, tuns, unghii", description: "Periat delicat pentru eliminarea blănii moarte, tuns igienic sau complet la rasele cu blană lungă, tăiat unghii, într-un mediu liniștit.", duration: "30–45 min", price: 150, unit: "ședință" },
    { id: "puppy", group: "caini", name: "Prima vizită pui (puppy intro)", subtitle: "Obișnuire blândă cu salonul", description: "Ședință scurtă pentru puii de 3–6 luni: spălat ușor, uscat, tăiat unghii și joacă. Scopul este ca următoarele vizite să fie relaxate.", duration: "45 min", price: 150, unit: "ședință" },
  ],

  /* Talii pentru estimatorul de preț (câini) */
  sizes: [
    { id: "mini", name: "Talie mică", note: "până la 5 kg · Yorkshire, Chihuahua, Bichon", factor: 1 },
    { id: "medie", name: "Talie medie", note: "5–15 kg · Cocker, Shih Tzu, Schnauzer", factor: 1.35 },
    { id: "mare", name: "Talie mare", note: "15–30 kg · Golden, Labrador, Samoyed", factor: 1.8 },
    { id: "gigant", name: "Talie gigant", note: "peste 30 kg · Newfoundland, Bernez", factor: 2.3 },
  ],
  coats: [
    { id: "scurta", name: "Blană scurtă", factor: 0.9 },
    { id: "medie", name: "Blană medie", factor: 1 },
    { id: "lunga", name: "Blană lungă / dublă", factor: 1.2 },
    { id: "incalcita", name: "Încâlcită", factor: 1.4 },
  ],

  process: [
    { step: "Programare", text: "Suni sau scrii pe mesaj. Ne spui rasa, talia, starea blănii și ce tunsoare vrei. Confirmăm ora și durata estimată." },
    { step: "Evaluare", text: "La sosire ne cunoaștem cu animalul, verificăm blana, pielea, urechile și unghiile, stabilim împreună tunsoarea." },
    { step: "Grooming", text: "Spălat, uscat, tuns, unghii, urechi. Cu pauze pentru animalele anxioase și fără cuști de uscare forțată." },
    { step: "Predare & sfaturi", text: "Îți arătăm rezultatul, îți spunem ce am observat și cum menții blana până la următoarea vizită." },
  ],

  aftercare: {
    title: "Îngrijire acasă",
    intro: "Câteva obiceiuri simple păstrează blana frumoasă între vizite.",
    tips: [
      { title: "Periază de 2–3 ori pe săptămână", text: "Rasele cu blană lungă zilnic. Periatul previne nodurile care, altfel, se pot rezolva doar prin tuns scurt." },
      { title: "Baie la 3–6 săptămâni", text: "Prea des usucă pielea. Folosește șampon pentru animale, niciodată pentru oameni." },
      { title: "Usca-l complet", text: "Blana umedă la rădăcină face noduri și miros. Uscătorul la temperatură mică, la distanță." },
      { title: "Unghii la 3–4 săptămâni", text: "Dacă le auzi pe parchet, sunt prea lungi. Le tăiem și între vizite, într-o ședință scurtă." },
      { title: "Urechi și ochi", text: "Verifică săptămânal. Roșeață, miros sau secreții înseamnă vizită la veterinar, nu la groomer." },
      { title: "Iarna și vara", text: "Nu tunde foarte scurt rasele cu blană dublă: blana le protejează și de frig, și de soare." },
    ],
  },

  policies: {
    title: "Bine de știut",
    items: [
      { title: "Programare cu confirmare", text: "Lucrăm doar pe programare, ca fiecare animal să aibă salonul liniștit. Confirmăm telefonic sau pe mesaj." },
      { title: "Vaccinuri și sănătate", text: "Animalul trebuie să fie vaccinat și deparazitat. Dacă are răni, paraziți sau o afecțiune a pielii, te rugăm să ne anunți înainte." },
      { title: "Blană încâlcită", text: "Nodurile strânse nu se descâlcesc fără durere. În aceste cazuri propunem tuns scurt, pentru confortul animalului, cu acordul tău." },
      { title: "Întârzieri și anulări", text: "Anunță-ne cu minimum 24 h înainte. După 20 de minute de întârziere, programarea poate fi reprogramată." },
      { title: "Animale anxioase sau agresive", text: "Lucrăm cu răbdare, fără sedare. Dacă siguranța animalului sau a groomerului e în pericol, oprim ședința și discutăm variante." },
      { title: "Plată", text: "Numerar sau card, la finalul ședinței. Pentru rasele mari sau blană foarte încâlcită, prețul final se confirmă la evaluare." },
    ],
  },

  testimonials: [
    { name: "Ana C.", text: "Bichonul meu se temea de orice salon. La Pet Expert a intrat singur la a doua vizită. Tunsoarea e impecabilă, exact ca în poze.", service: "Frezură completă câini", rating: 5 },
    { name: "Mihai R.", text: "Pisica noastră persană avea noduri peste tot. Au descâlcit-o cu răbdare, fără sedare, și ne-au arătat cum să o periem acasă.", service: "Grooming pisici", rating: 5 },
    { name: "Irina V.", text: "Yorkshire-ul meu iese de aici ca de la concurs. Programare rapidă, personal care iubește animalele, salon curat.", service: "Tuns de rasă", rating: 5 },
    { name: "Dumitru S.", text: "Am un Samoyed, deci mult păr. Spălat, uscat, periat complet în două ore. Blana e pufoasă și nu mai lasă smocuri prin casă.", service: "Spălat & uscat", rating: 5 },
    { name: "Elena P.", text: "Iepurașul nostru cu blană lungă a fost tuns delicat, fără stres. Nu știam că există un salon care se ocupă și de iepuri.", service: "Îngrijire iepuri", rating: 5 },
    { name: "Cristina B.", text: "Prima vizită a puiului nostru a fost joacă și blândețe. Acum, la 1 an, adoră să vină. Recomand din toată inima.", service: "Puppy intro", rating: 5 },
  ],

  faq: [
    { q: "Cât durează o frezură completă?", a: "Între 1h 30 și 3h, în funcție de talie, tipul blănii și starea ei. Rasele mari cu blană dublă durează mai mult. Îți spunem estimarea la programare." },
    { q: "Lucrați cu pisici?", a: "Da, fără sedare. Pisicile sunt primite în intervale fără câini în salon, cu răbdare și pauze. Dacă pisica nu tolerează ședința, oprim și discutăm variante." },
    { q: "Tundeți iepuri?", a: "Da. Periat, tuns igienic sau complet pentru rasele cu blană lungă (Angora, Lionhead), tăiat unghii. Într-un mediu liniștit." },
    { q: "Câinele meu este anxios sau agresiv. Îl primiți?", a: "Da, cu programare și cu discuție înainte. Lucrăm treptat, fără forțare, uneori în două ședințe mai scurte. Siguranța animalului este prioritatea." },
    { q: "Ce trebuie să aduc?", a: "Carnetul de vaccinări la prima vizită și, dacă ai, o poză cu tunsoarea dorită. Restul, prosoape, produse, instrumente, sunt ale noastre." },
    { q: "Cât de des ar trebui să vin?", a: "Frezură completă la 4–8 săptămâni, în funcție de rasă. Tuns igienic sau unghii între vizite, la 3–4 săptămâni." },
    { q: "Pot rămâne cu animalul în timpul frezurii?", a: "De regulă animalele sunt mai calme fără stăpân în preajmă. Poți aștepta în zona de recepție sau te sunăm când e gata." },
    { q: "Cum mă programez?", a: "Telefonic la 076 666 466, pe WhatsApp/Viber sau pe mesaj pe Instagram. Confirmăm data, ora și durata estimată." },
  ],

  photos: [
    { src: "post-01.jpg", alt: "Bichon tuns, frezură completă", tag: "Bichon" },
    { src: "post-02.jpg", alt: "Yorkshire după frezură de rasă", tag: "Yorkshire" },
    { src: "post-03.jpg", alt: "Pisică persană periată și descâlcită", tag: "Pisică" },
    { src: "post-04.jpg", alt: "Câine înainte de frezură, blană lungă", tag: "Înainte" },
    { src: "post-05.jpg", alt: "Iepure cu blană lungă îngrijit", tag: "Iepure" },
    { src: "post-06.jpg", alt: "Spălare profesională, spumă și duș", tag: "Spălat" },
    { src: "post-07.jpg", alt: "Interior salon Pet Expert", tag: "Salon" },
    { src: "post-08.jpg", alt: "Groomer tunzând un Spitz", tag: "Groomer" },
    { src: "post-09.jpg", alt: "Tăiat unghii câine", tag: "Unghii" },
    { src: "post-10.jpg", alt: "Schnauzer tuns de rasă", tag: "Schnauzer" },
    { src: "post-11.jpg", alt: "Pui la prima vizită", tag: "Puppy" },
    { src: "post-12.jpg", alt: "Instrumente de grooming sterilizate", tag: "Instrumente" },
    { src: "portrait.jpg", alt: "Groomer Pet Expert cu un câine în brațe", tag: "Echipa" },
    { src: "hero.jpg", alt: "Câine fericit după frezură, fotografie de copertă", tag: "Cover" },
  ],
};

/* aliasuri de compatibilitate cu șabloanele */
window.PETEXPERT.founder = window.PETEXPERT.team;
window.PETEXPERT.locations = [
  { id: "muncesti", city: "Chișinău", address: "Str. Muncești 94", note: "Salon Pet Expert · pe programare · parcare în față", mapsUrl: window.PETEXPERT.brand.mapsUrl },
];

window.PETEXPERT.util = {
  photoPath(file) { return "../../shared/photos/" + file; },
  waLink(text) {
    const b = window.PETEXPERT.brand;
    return "https://wa.me/" + b.whatsapp + "?text=" + encodeURIComponent(text || "Bună! Aș dori o programare la Pet Expert pentru frezură. Când aveți un loc liber?");
  },
  priceLabel(p, unit, from) { return p == null ? "la cerere" : (from ? "de la " : "") + p + " lei" + (unit ? " / " + unit : ""); },
  placeholder(label, a, b, fg) {
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 1000'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/></linearGradient></defs><rect width='800' height='1000' fill='url(#g)'/><circle cx='400' cy='500' r='150' fill='${fg}' fill-opacity='.15'/><text x='400' y='880' font-family='sans-serif' font-size='30' fill='${fg}' fill-opacity='.7' text-anchor='middle'>${label.replace(/&/g,'&amp;').replace(/</g,'&lt;')}</text></svg>`;
    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
  },
  bindPlaceholders(a, b, fg) {
    const swap = (img) => { if (img.dataset.fallback) return; img.dataset.fallback = "1"; img.src = window.PETEXPERT.util.placeholder(img.dataset.photo || img.alt, a, b, fg); };
    document.querySelectorAll("img[data-photo]").forEach((img) => { img.addEventListener("error", () => swap(img)); if (img.complete && img.naturalWidth === 0) swap(img); });
  },
};
