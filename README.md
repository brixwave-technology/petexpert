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

Status: schelet inițial. Design-urile și conținutul se construiesc după primirea datelor PetExpert.
