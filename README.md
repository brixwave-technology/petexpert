# Portal Brixwave × PetExpert

Portal de prezentare prin care clientul (PetExpert, https://petexpert.md) alege unul dintre
design-urile propuse de Brixwave pentru site-ul de prezentare, apoi trimite cererea de ofertă.

Structura urmează portalul Eternal Beauty:

```
index.html                 ← portal (alegere design, preview live, cerere ofertă)
assets/brixwave.{css,js}   ← stil + logică portal (config în capul lui brixwave.js)
designs/                   ← design-urile (se adaugă după primirea datelor)
shared/                    ← date comune + fotografii
.github/workflows/pages.yml← publicare automată pe GitHub Pages (Settings → Pages → GitHub Actions)
```

Design-uri: `01-play` (mobile-first, estimator de preț), `02-studio` (editorial), `03-neon` (întunecat, energic).
Datele salonului (servicii, prețuri orientative, program, contact, FAQ) sunt în `shared/petexpert-data.js`;
ilustrațiile demonstrative se generează cu `python3 scripts/generate-photos.py` și se înlocuiesc cu poze reale
păstrând numele fișierelor din `shared/photos/`.

Publicare: **Settings → Pages → Source: GitHub Actions** → https://brixwave-technology.github.io/petexpert/
