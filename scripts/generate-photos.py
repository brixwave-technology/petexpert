#!/usr/bin/env python3
"""Ilustrații flat pentru Pet Expert (câini, pisici, iepuri, salon). Pillow + numpy.
Rulează: python3 scripts/generate-photos.py"""
import math, random, os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = os.path.join(os.path.dirname(__file__), "..", "shared", "photos")
W, H, SS = 1000, 1250, 3; S, SH = W * SS, H * SS
random.seed(5); np.random.seed(5)
def hexc(h): h = h.lstrip("#"); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def lerp(a, b, t): return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))
def gradient_bg(c1, c2, cx=0.5, cy=0.35):
    y, x = np.mgrid[0:H, 0:W].astype(np.float32); d = np.sqrt(((x / W) - cx) ** 2 + ((y / H) - cy) ** 2)
    t = np.clip(d / 0.9, 0, 1)[..., None]; img = np.array(c1, np.float32) * (1 - t) + np.array(c2, np.float32) * t
    return Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), "RGB")
def grain(img, amount=5):
    n = np.random.normal(0, amount, (img.height, img.width, 1)).astype(np.float32)
    return Image.fromarray(np.clip(np.asarray(img).astype(np.float32) + n, 0, 255).astype(np.uint8), "RGB")
def vignette(img, strength=0.22):
    y, x = np.mgrid[0:img.height, 0:img.width].astype(np.float32); d = np.sqrt(((x / img.width) - 0.5) ** 2 + ((y / img.height) - 0.5) ** 2)
    m = 1 - strength * np.clip((d - 0.35) / 0.45, 0, 1) ** 1.5
    return Image.fromarray(np.clip(np.asarray(img).astype(np.float32) * m[..., None], 0, 255).astype(np.uint8), "RGB")
def compose(bg, fn, blur=0.6):
    big = Image.new("RGBA", (S, SH), (0, 0, 0, 0)); d = ImageDraw.Draw(big); fn(d)
    big = big.resize((W, H), Image.LANCZOS)
    if blur: big = big.filter(ImageFilter.GaussianBlur(blur))
    return Image.alpha_composite(bg.convert("RGBA"), big).convert("RGB")
def finish(img, name): vignette(grain(img)).save(os.path.join(OUT, name), "JPEG", quality=86, optimize=True, progressive=True); print("✓", name)
def circles(d, cx, cy, n, color, rmin, rmax, alpha=60):
    for _ in range(n):
        r = random.randint(rmin, rmax); x = random.randint(0, S); y = random.randint(0, SH)
        d.ellipse([x - r, y - r, x + r, y + r], fill=color + (alpha,))
def E(d, cx, cy, rx, ry, fill, outline=None, w=0): d.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=fill + (255,), outline=(outline + (255,)) if outline else None, width=w)
def RR(d, x0, y0, x1, y1, r, fill): d.rounded_rectangle([x0, y0, x1, y1], radius=r, fill=fill + (255,))

CREAM, CORAL, MUSTARD, TEAL, INK, WHITE = hexc("#fff4e8"), hexc("#ff7a59"), hexc("#ffc857"), hexc("#1f6f78"), hexc("#23282d"), hexc("#ffffff")
SAND, STONE, BROWN, BROWN_2, GREY, PINK, MINT, SKY = hexc("#efe2d0"), hexc("#d9cfc2"), hexc("#8b5a3c"), hexc("#c99367"), hexc("#b9b6b2"), hexc("#f2a0a0"), hexc("#cfe9dd"), hexc("#cfe4f4")

def eyes(d, cx, cy, gap, r, color=INK):
    for sx in (-1, 1):
        E(d, cx + sx * gap, cy, r, r, color); E(d, cx + sx * gap - r * .3, cy - r * .3, r * .3, r * .3, WHITE)
def nose_mouth(d, cx, cy, size, color=INK, tongue=True):
    E(d, cx, cy, size, size * .7, color)
    d.arc([cx - size * 1.6, cy, cx, cy + size * 1.8], 0, 180, fill=color + (255,), width=int(size * .25))
    d.arc([cx, cy, cx + size * 1.6, cy + size * 1.8], 0, 180, fill=color + (255,), width=int(size * .25))
    if tongue: RR(d, cx - size * .55, cy + size * 1.2, cx + size * .55, cy + size * 2.6, int(size * .5), PINK)

def dog_face(d, cx, cy, R, fur=BROWN_2, fur2=BROWN, floppy=True, fluffy=False, bow=None):
    # urechi
    if floppy:
        for sx in (-1, 1): E(d, cx + sx * R * .95, cy + R * .15, R * .42, R * .8, fur2)
    else:
        for sx in (-1, 1): d.polygon([(cx + sx * R * .55, cy - R * .5), (cx + sx * R * 1.15, cy - R * 1.45), (cx + sx * R * 1.05, cy - R * .1)], fill=fur2 + (255,))
    if fluffy:
        for k in range(18):
            a = math.radians(k * 20); E(d, cx + math.cos(a) * R * .95, cy + math.sin(a) * R * .95, R * .28, R * .28, fur)
    E(d, cx, cy, R, R * .95, fur)
    E(d, cx, cy + R * .38, R * .5, R * .38, lerp(fur, WHITE, .55))  # bot
    eyes(d, cx, cy - R * .12, R * .36, R * .11)
    nose_mouth(d, cx, cy + R * .3, R * .13)
    if bow: RR(d, cx - R * .45, cy - R * 1.05, cx + R * .45, cy - R * .75, int(R * .12), bow); E(d, cx, cy - R * .9, R * .12, R * .12, lerp(bow, INK, .3))

def cat_face(d, cx, cy, R, fur=GREY, fur2=hexc("#9a9692")):
    for sx in (-1, 1):
        d.polygon([(cx + sx * R * .35, cy - R * .6), (cx + sx * R * .95, cy - R * 1.45), (cx + sx * R * 1.0, cy - R * .3)], fill=fur + (255,))
        d.polygon([(cx + sx * R * .5, cy - R * .65), (cx + sx * R * .88, cy - R * 1.25), (cx + sx * R * .9, cy - R * .45)], fill=PINK + (255,))
    E(d, cx, cy, R, R * .9, fur)
    for sx in (-1, 1):
        E(d, cx + sx * R * .36, cy - R * .08, R * .16, R * .2, hexc("#7fb069")); E(d, cx + sx * R * .36, cy - R * .08, R * .05, R * .18, INK)
    E(d, cx, cy + R * .3, R * .1, R * .07, PINK)
    for sx in (-1, 1):
        for k in range(3):
            y = cy + R * (.25 + k * .1); d.line([(cx + sx * R * .25, y), (cx + sx * R * 1.2, y + (k - 1) * R * .12)], fill=fur2 + (255,), width=int(R * .03))
    d.arc([cx - R * .25, cy + R * .3, cx, cy + R * .55], 0, 180, fill=INK + (255,), width=int(R * .03)); d.arc([cx, cy + R * .3, cx + R * .25, cy + R * .55], 0, 180, fill=INK + (255,), width=int(R * .03))

def rabbit(d, cx, cy, R, fur=hexc("#e8dccf")):
    for sx in (-1, 1):
        E(d, cx + sx * R * .45, cy - R * 1.25, R * .28, R * .95, fur); E(d, cx + sx * R * .45, cy - R * 1.25, R * .13, R * .7, PINK)
    E(d, cx, cy, R, R * .9, fur)
    E(d, cx, cy + R * 1.3, R * 1.25, R * .9, fur)
    eyes(d, cx, cy - R * .05, R * .4, R * .1)
    E(d, cx, cy + R * .3, R * .12, R * .09, PINK)
    for sx in (-1, 1): E(d, cx + sx * R * .22, cy + R * .48, R * .24, R * .2, WHITE)

def paw(d, cx, cy, R, color):
    E(d, cx, cy + R * .2, R, R * .8, color)
    for k, (dx, dy) in enumerate([(-1.05, -.7), (-.4, -1.15), (.4, -1.15), (1.05, -.7)]): E(d, cx + dx * R, cy + dy * R, R * .38, R * .45, color)

def scissors(d, x, y, L, angle, color=hexc("#8e959c")):
    a = math.radians(angle); ux, uy = math.cos(a), math.sin(a); nx, ny = -uy, ux
    for s in (-1, 1):
        d.line([(x + nx * s * 16, y + ny * s * 16), (x + ux * L + nx * s * 60, y + uy * L + ny * s * 60)], fill=color + (255,), width=26)
        E(d, x - ux * L * .35 + nx * s * 70, y - uy * L * .35 + ny * s * 70, 75, 55, color); E(d, x - ux * L * .35 + nx * s * 70, y - uy * L * .35 + ny * s * 70, 45, 30, (0, 0, 0)) if False else None
    E(d, x, y, 18, 18, INK)

os.makedirs(OUT, exist_ok=True)
# hero — câine fericit cu fundă, fundal coral
bg = gradient_bg(hexc("#ff8f6f"), hexc("#f45f3b"), .5, .4)
def hero(d):
    circles(d, 0, 0, 10, WHITE, 60, 200, 30)
    RR(d, S * .1, SH * .62, S * .9, SH * 1.05, 200, hexc("#f3d6b8"))
    dog_face(d, S * .5, SH * .5, S * .26, BROWN_2, BROWN, floppy=True, bow=TEAL)
finish(compose(bg, hero), "hero.jpg")
# portrait — groomer cu câine în brațe
bg = gradient_bg(MINT, hexc("#b7d9c9"), .5, .3)
def portrait(d):
    cx, cy = S * .5, SH * .38
    E(d, cx, cy - S * .02, S * .27, S * .3, hexc("#4a3527"))
    RR(d, cx - S * .07, cy + S * .14, cx + S * .07, cy + S * .32, 60, hexc("#efc9b3"))
    E(d, cx, cy + S * .7, S * .55, S * .42, TEAL)  # uniformă
    E(d, cx, cy, S * .19, S * .23, hexc("#f2d3bf"))
    d.chord([cx - S * .22, cy - S * .3, cx + S * .22, cy - S * .02], 200, 340, fill=hexc("#4a3527") + (255,))
    eyes(d, cx, cy - S * .01, S * .07, S * .018); E(d, cx, cy + S * .1, S * .04, S * .02, PINK)
    dog_face(d, cx + S * .18, cy + S * .55, S * .13, hexc("#f0e6d6"), hexc("#d9c8b0"), floppy=True, fluffy=True)
finish(compose(bg, portrait, .5), "portrait.jpg")
# post-01 Bichon alb pufos, fundal galben
bg = gradient_bg(hexc("#ffd98a"), MUSTARD, .5, .35)
finish(compose(bg, lambda d: (circles(d, 0, 0, 8, WHITE, 60, 180, 40), dog_face(d, S * .5, SH * .52, S * .27, hexc("#f7f2ea"), hexc("#e6ddd0"), floppy=True, fluffy=True, bow=CORAL))), "post-01.jpg")
# post-02 Yorkshire cu funda, fundal teal
bg = gradient_bg(hexc("#2b8a94"), TEAL, .5, .4)
finish(compose(bg, lambda d: dog_face(d, S * .5, SH * .52, S * .26, hexc("#b8a48e"), hexc("#5b4632"), floppy=False, bow=PINK)), "post-02.jpg")
# post-03 pisică persană gri, fundal roz
bg = gradient_bg(hexc("#ffd6d0"), hexc("#f7b3aa"), .5, .35)
finish(compose(bg, lambda d: (circles(d, 0, 0, 8, WHITE, 60, 160, 40), cat_face(d, S * .5, SH * .55, S * .27))), "post-03.jpg")
# post-04 ÎNAINTE: câine ciufulit
bg = gradient_bg(SAND, STONE, .5, .35)
def p4(d):
    cx, cy, R = S * .5, SH * .52, S * .26
    for k in range(40):
        a = math.radians(k * 9 + random.uniform(-4, 4)); L = R * random.uniform(1.05, 1.35)
        d.line([(cx + math.cos(a) * R * .8, cy + math.sin(a) * R * .8), (cx + math.cos(a) * L, cy + math.sin(a) * L)], fill=hexc("#a8865f") + (255,), width=int(R * .06))
    dog_face(d, cx, cy, R, hexc("#c99f74"), hexc("#a8865f"), floppy=True)
finish(compose(bg, p4), "post-04.jpg")
# post-05 iepure
bg = gradient_bg(hexc("#e3f0ff"), SKY, .5, .35)
finish(compose(bg, lambda d: rabbit(d, S * .5, SH * .5, S * .2)), "post-05.jpg")
# post-06 spălat: cadă cu spumă
bg = gradient_bg(hexc("#dff3ff"), SKY, .5, .3)
def p6(d):
    RR(d, S * .12, SH * .55, S * .88, SH * .9, 160, WHITE)
    RR(d, S * .16, SH * .58, S * .84, SH * .66, 60, hexc("#bfe3f5"))
    dog_face(d, S * .5, SH * .5, S * .2, hexc("#c99f74"), hexc("#a8865f"), floppy=True)
    for _ in range(26):
        x = random.uniform(S * .15, S * .85); y = random.uniform(SH * .4, SH * .62); r = random.uniform(30, 110)
        E(d, x, y, r, r, WHITE)
    for _ in range(14):
        x = random.uniform(S * .1, S * .9); y = random.uniform(SH * .1, SH * .45); r = random.uniform(20, 60)
        d.ellipse([x - r, y - r, x + r, y + r], outline=WHITE + (255,), width=6)
    d.line([(S * .82, SH * .1), (S * .82, SH * .3)], fill=hexc("#8e959c") + (255,), width=26); E(d, S * .82, SH * .32, 80, 40, hexc("#8e959c"))
finish(compose(bg, p6), "post-06.jpg")
# post-07 interior salon
bg = gradient_bg(CREAM, hexc("#f5e6d4"), .5, .2)
def p7(d):
    d.rectangle([0, SH * .72, S, SH], fill=hexc("#e9d8c2") + (255,))
    RR(d, S * .08, SH * .5, S * .62, SH * .58, 40, TEAL); 
    for x in (S * .14, S * .56): d.rectangle([x, SH * .58, x + 24, SH * .9], fill=hexc("#8e959c") + (255,))
    RR(d, S * .7, SH * .2, S * .95, SH * .9, 60, WHITE); RR(d, S * .73, SH * .24, S * .92, SH * .5, 40, SKY)
    RR(d, S * .1, SH * .15, S * .5, SH * .42, 40, WHITE)
    paw(d, S * .3, SH * .3, S * .05, CORAL)
    dog_face(d, S * .35, SH * .42, S * .1, hexc("#f7f2ea"), hexc("#e6ddd0"), floppy=True, fluffy=True)
    for k in range(3): RR(d, S * (.12 + k * .1), SH * .84, S * (.12 + k * .1) + 100, SH * .92, 30, [CORAL, MUSTARD, MINT][k])
finish(compose(bg, p7, .5), "post-07.jpg")
# post-08 groomer tunde un Spitz (foarfecă)
bg = gradient_bg(hexc("#fff0d6"), hexc("#ffd9a8"), .5, .35)
def p8(d):
    dog_face(d, S * .45, SH * .58, S * .25, hexc("#f4c58f"), hexc("#d99a5c"), floppy=False, fluffy=True)
    scissors(d, S * .78, SH * .38, S * .22, 140)
    for (x0, y0, x1, y1) in [(S * 1.05, SH * .05, S * .84, SH * .3)]: d.line([(x0, y0), (x1, y1)], fill=TEAL + (255,), width=120)
finish(compose(bg, p8), "post-08.jpg")
# post-09 tăiat unghii: lăbuță mare + clește
bg = gradient_bg(MINT, hexc("#b7d9c9"), .5, .35)
def p9(d):
    paw(d, S * .45, SH * .55, S * .2, hexc("#c99f74"))
    for k, (dx, dy) in enumerate([(-1.05, -.7), (-.4, -1.15), (.4, -1.15), (1.05, -.7)]):
        x, y = S * .45 + dx * S * .2, SH * .55 + dy * S * .2 - S * .07; d.polygon([(x - 18, y), (x + 18, y), (x, y - 70)], fill=WHITE + (255,))
    d.line([(S * .95, SH * .15), (S * .68, SH * .38)], fill=hexc("#8e959c") + (255,), width=34); d.line([(S * .98, SH * .22), (S * .7, SH * .42)], fill=hexc("#8e959c") + (255,), width=34)
finish(compose(bg, p9), "post-09.jpg")
# post-10 Schnauzer
bg = gradient_bg(hexc("#e8e6f5"), hexc("#c9c4e8"), .5, .35)
def p10(d):
    cx, cy, R = S * .5, SH * .5, S * .26
    dog_face(d, cx, cy, R, hexc("#8a8f96"), hexc("#5b6068"), floppy=True)
    RR(d, cx - R * .55, cy + R * .3, cx + R * .55, cy + R * 1.05, int(R * .3), hexc("#e6e6e6"))  # barbă
    for sx in (-1, 1): RR(d, cx + sx * R * .36 - R * .2, cy - R * .32, cx + sx * R * .36 + R * .2, cy - R * .22, 10, hexc("#e6e6e6"))
    nose_mouth(d, cx, cy + R * .3, R * .13, tongue=False)
finish(compose(bg, p10), "post-10.jpg")
# post-11 puppy mic cu minge
bg = gradient_bg(hexc("#ffe1d6"), hexc("#ffbfae"), .5, .35)
def p11(d):
    dog_face(d, S * .5, SH * .5, S * .22, hexc("#f0d9b8"), hexc("#d9b98e"), floppy=True)
    E(d, S * .78, SH * .8, S * .09, S * .09, TEAL); E(d, S * .78, SH * .8, S * .05, S * .09, MUSTARD)
finish(compose(bg, p11), "post-11.jpg")
# post-12 instrumente: foarfecă, pieptene, mașină
bg = gradient_bg(hexc("#f6f3ee"), STONE, .5, .3)
def p12(d):
    RR(d, S * .1, SH * .2, S * .9, SH * .85, 80, WHITE)
    scissors(d, S * .3, SH * .5, S * .2, -70)
    RR(d, S * .55, SH * .28, S * .62, SH * .78, 20, hexc("#8e959c"))
    for k in range(14): d.line([(S * .62, SH * (.3 + k * .033)), (S * .72, SH * (.3 + k * .033))], fill=hexc("#8e959c") + (255,), width=10)
    RR(d, S * .76, SH * .3, S * .86, SH * .75, 50, INK); RR(d, S * .77, SH * .26, S * .85, SH * .32, 10, hexc("#8e959c"))
finish(compose(bg, p12, .5), "post-12.jpg")
print("gata")
