# Ebook reading in Book reader devices

## How to crop continus pdf books?

Inspired by this [blog post](https://jadi.net/2012/02/linux-convert-pdf-to-one-column/) article by [Jadi](https://github.com/jadijadi) 
In there he use `convert` but I want to higher level program.

Khaterate [Haj sayyah esfahani(خاطرات حاج سیاح اصفهانی)](https://en.wikipedia.org/wiki/Hajj_Sayyah) is our source.

## convet pdf file to two coloumn

```
$ sudo apt install mutool
$ mutool poster -x 2 haj_sayah.pdf output.pdf
```

## Unfortunatley pages in output file wrong ordered

**Why?**
Persian written from Right to Left side, pages in Persian books arranges in reverse order.

So cropping each pages and append them work for default Left to Right languages like English and 
Messing up the order of Persian book.

Here We need reorder pages in a manner to swap each even page with odd one.

## Reverse order of page for Persian books

We swap even with odd pages.

```
$ sudo apt install pdftk
$ pdftk output.pdf shuffle even odd output haj_sayyah_.pdf
```

## Final change
At last we need replace cover page from original book. here is the command.

```
$ pdftk A=haj_sayyah_.pdf B=haj_sayah.pdf cat B1 A3-end output out1.pdf
```

