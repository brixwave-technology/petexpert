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

Design-uri (toate pe paleta logo-ului: crem, maro, alb): `01-bubbles` (baie & spumă, bule pe canvas, racletă înainte/după), `02-runway` (podium de modă, cortină la scroll, cărți de juriu), `03-barbershop` (frizerie vintage: neon, stâlp rotitor, tablă de cretă, bilet care se rupe), `04-atelier` (boutique lux discret), `05-papercut` (hârtie în straturi, parallax), `06-pasaport` (bento + pașaport cu ștampile, status live).
Datele salonului (servicii, prețuri orientative, program, contact, FAQ) sunt în `shared/petexpert-data.js`;
ilustrațiile demonstrative se generează cu `python3 scripts/generate-photos.py` și se înlocuiesc cu poze reale
păstrând numele fișierelor din `shared/photos/`.

Publicare: **Settings → Pages → Source: GitHub Actions** → https://brixwave-technology.github.io/petexpert/
