# Cristian Sîrbu — portofoliu

Portofoliu în Next.js App Router, React, TypeScript și Tailwind CSS. Design luminos cu sticlă mată, accente lila și efecte la hover.

## Pornire

Necesită Node.js 20.9 sau mai nou și npm.

```sh
npm ci
npm run dev
```

Deschide http://127.0.0.1:3000/ro. Limbile disponibile: `/ro`, `/en`, `/ru`; `/` redirecționează spre română.

Pentru producție:

```sh
npm run build
npm run start
```

Scripturile folosesc Webpack, compatibil cu mediul local în care a fost verificat proiectul. Nu este necesară o bază de date.

## Modificarea conținutului

- `content/profile.json`: nume, email, localitate, experiență și ordinea proiectelor principale în `featuredIds`.
- `content/ro.json`, `content/en.json`, `content/ru.json`: textele interfeței.
- `content/projects.json`: cele 70 de proiecte furnizate, linkuri, descrieri în trei limbi și capturi.
- `public/projects/`: cele 62 de capturi reale disponibile.
- `public/cv/`: CV-urile PDF pentru descărcare.
- `app/globals.css`: designul de sticlă și adaptarea la ecrane mici.
- `components/`: interfața, cardurile proiectelor și dialogul cu contribuția personală.

Selecția principală conține 12 proiecte, cu Wijnwals după Mimi Hotels. Celelalte 58 sunt în arhiva extensibilă. Totalul de 108 reprezintă experiența profesională declarată, nu numărul linkurilor din galerie.

Castel Mimi este etichetat ca o contribuție parțială. Yum Yum prezintă doar contribuția la frontend. Designurile au fost furnizate. Platforma privată Angular nu este afișată.

## CV și imagini

CV-urile sunt o primă versiune bazată pe informațiile confirmate. Nu au fost inventate perioade calendaristice, nume de angajatori, studii sau niveluri de limbi străine. Aceste date pot fi completate la o revizie ulterioară.

Opt proiecte au previzualizare indisponibilă: Adalin, Blysso Webinar, Secret Point, Casa Gospodarului, Neo Beauty, Softy Shop, CXECO și OneStone. Cardurile păstrează linkul și un mesaj explicit. Pentru OneStone este necesară o captură a proiectului original, deoarece site-ul public era în mentenanță la verificare.

## Publicare

Publicarea pe GitHub Pages folosește `.github/workflows/pages.yml`. La fiecare push în `main`, GitHub instalează dependențele, generează exportul static și publică folderul `out/`. În Settings → Pages, Source trebuie să fie GitHub Actions.

Workflow-ul preia automat adresa și calea repository-ului din GitHub Pages. Linkurile de limbă, capturile și CV-urile funcționează și când site-ul este sub `/portfolio/`.

Pentru a construi manual aceeași versiune:

```sh
NEXT_PUBLIC_BASE_PATH=/portfolio SITE_URL=https://cupidyt.github.io/portfolio npm run build:pages
```

Pentru găzduire la rădăcina unui domeniu, lasă `NEXT_PUBLIC_BASE_PATH` gol. Exportul include o pagină de intrare care redirecționează către `/ro/`, plus cele trei rute de limbă. Imaginile sunt servite ca fișiere statice în export; nu necesită server Next.js. Build-ul obișnuit și pornirea locală cu Node rămân disponibile separat.

La alegerea domeniului, copiază `.env.example` în `.env.local` și setează `SITE_URL` la adresa reală HTTPS. Aceasta activează URL-urile canonice și alternativele de limbă în metadate; reconstruiește apoi aplicația. Nu introduce o adresă fictivă.

Contactul folosește `mailto:` și deschide aplicația de email a vizitatorului. Nu există formular sau serviciu de trimitere configurat.

## Verificare

```sh
npm run typecheck
npm run build
```

Verificate: cele trei rute de limbă și atributul `lang`, 12 proiecte principale, filtrarea, dialogul și închiderea cu Escape, hover-ul, încărcarea celor 62 de imagini, optimizarea WebP, contactul și servirea celor trei PDF-uri. Verificare vizuală pe desktop și la lățimi de telefon de 320 și 390 px.
