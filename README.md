# Sito Dr. Edoardo Bo

Sito di [edodoc.it](https://www.edodoc.it): sostituisce il tema Shopify. È una single page application React.

## Stack

Vite, React 19, React Router, Framer Motion, Lenis per lo scroll e CSS scritto a mano. I font sono inclusi nel bundle, senza richieste a Google Fonts.

## Avvio in locale

Serve Node.js 22.

```bash
npm install
npm run dev
```

| Comando | Azione |
|---------|--------|
| `npm run dev` | Server di sviluppo su `http://localhost:5173` |
| `npm run build` | Genera `public/sitemap.xml` e compila in `dist/` |
| `npm run preview` | Serve la build |
| `npm run lint` | ESLint |

## Cosa modificare e dove

| Cosa | Dove |
|------|------|
| Link di prenotazione, social, privacy, form | `src/data/site.js`, oggetto `SITE` |
| Numero di percorsi completati e mesi | `src/data/site.js`, oggetto `STATS` |
| Posti esauriti e mese di ripartenza | `src/data/site.js`, oggetto `POSTI` |
| Casi studio | `src/data/casi-index.json` (card) e `src/data/casi.json` (testo completo), foto in `public/img/casi/<slug>.webp` |

## Struttura

- `src/pages`: una pagina per file. La home è composta dalle sezioni in `src/components/home`.
- `src/components/Compass.jsx`: quadrante, ago e indicatore di rotta fisso.
- `src/components/MagneticField.jsx`: campo magnetico su canvas.
- `src/styles`: `base.css` (colori, tipografia, testata, piede), `home.css`, `pages.css`.

## Pubblicazione

`./deploy.sh` compila e pubblica su Firebase Hosting, sito `edodoc-sito` ([edodoc-sito.web.app](https://edodoc-sito.web.app)). Il progetto Google Cloud è quello di edodoc-hq: serve la stessa chiave del service account `edodoc-deploy` in `~/.config/edodoc/edodoc-deploy.json`, e il sito di destinazione è fissato in `firebase.json` perché quello predefinito è riservato al gestionale.

Tutte le rotte servono `index.html`: i link interni e i vecchi indirizzi Shopify sono gestiti da React Router in `src/App.jsx`.

Prima di spostare il dominio da Shopify: il libro punta ancora al checkout Shopify (`SITE.libro`) e va sostituito con un form dedicato.
