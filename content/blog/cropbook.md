+++
title = "Fixing Page Order When Cropping Two-Column Persian PDFs"
description = "Splitting a two-column PDF into single pages with mutool, then fixing the page order that breaks for right-to-left books."
date = 2026-06-20

[taxonomies]
tags = ["DevOps", "Linux"]
categories = ["Guide"]
+++

# Fixing Page Order When Cropping Two-Column Persian PDFs

Some e-book readers render two-column scanned PDFs poorly. Splitting each spread into individual
pages fixes readability — but for Persian (right-to-left) books, a naive split leaves the pages in
the wrong order.

> Credit to [Jadi's original post](https://jadi.net/2012/02/linux-convert-pdf-to-one-column/) for the
> `convert`-based approach — this uses `mutool` instead, which handles the splitting in one step.

---

## 1. Split Each Two-Column Page Into Two Single Pages

```bash
sudo apt install mupdf-tools
```

```bash
mutool poster -x 2 haj_sayah.pdf output.pdf
```

**What this does:** Splits each two-column spread into two separate single-column pages.

---

## 2. Fix the Resulting Page Order

**Why it breaks:** Persian is written right-to-left, so pages in a Persian book are ordered in
reverse relative to a left-to-right book. `mutool poster` splits pages assuming left-to-right order,
which works fine for English books but scrambles the order for Persian ones.

**The fix:** Swap each even page with the odd page next to it.

```bash
sudo apt install pdftk
```

```bash
pdftk output.pdf shuffle even odd output haj_sayyah_.pdf
```

---

## 3. Restore the Original Cover

The shuffle step also reorders the cover. Swap it back from the original file:

```bash
pdftk A=haj_sayyah_.pdf B=haj_sayah.pdf cat B1 A3-end output out1.pdf
```

---

## Result

`out1.pdf` is the final, correctly-ordered, single-column file — readable page by page on any e-reader.

| Step | Command | Purpose |
|------|---------|---------|
| 1 | `mutool poster -x 2` | Split columns |
| 2 | `pdftk shuffle even odd` | Fix RTL order |
| 3 | `pdftk cat B1 A3-end` | Restore cover |
