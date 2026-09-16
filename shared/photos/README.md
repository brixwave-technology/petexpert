# Fotografii Pet Expert

Instagram (@petgroomingexpert.md) și petexpert.md nu au fost accesibile din mediul în care
s-a construit portalul, așa că setul actual folosește **fotografii reale de câini și pisici**
din imagini de test ale unor proiecte open-source publice (PyTorch Hub și TorchVision,
TensorFlow Models și TF.js, Hugging Face Transformers, OpenMMLab, PaddleClas, Jetson Inference,
Segment Anything, Darknet). Sunt **înlocuitori temporari**, de calitate demonstrativă;
înainte de publicarea site-ului final se înlocuiesc cu pozele salonului.

## Cum pui pozele reale ale salonului

Suprascrie fișierele cu exact aceste nume, în format JPG vertical 4:5 (min. 1000×1250 px):

| Fișier         | Conținut recomandat                                   | Unde apare                          |
| -------------- | ----------------------------------------------------- | ----------------------------------- |
| `hero.jpg`     | cea mai bună lucrare, câine pufos, frezură completă   | hero-ul celor 3 design-uri          |
| `portrait.jpg` | groomer cu un animal în brațe                         | secțiunea „Echipa”                  |
| `post-01.jpg`  | rezultat „după” (curat, tuns)                         | slider înainte/după (Play), galerii |
| `post-04.jpg`  | „înainte” (blană lungă / încâlcită)                   | slider înainte/după (Play)          |
| `post-02.jpg` … `post-12.jpg` | lucrări: câini, pisici, iepuri, spălat, salon | galerii, carduri servicii          |

Legendele și tag-urile se editează în `shared/petexpert-data.js` → `photos`.
Setul de ilustrații flat de rezervă se regenerează cu `python3 scripts/generate-photos.py`.
