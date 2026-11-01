// Genera public/sitemap.xml dalle pagine fisse e dai casi studio
import { readFileSync, writeFileSync } from 'node:fs'

const BASE = 'https://www.edodoc.it'
const pages = ['/', '/metodo-bussola', '/chi-sono', '/testimonianze', '/consulenza-conoscitiva', '/masterclass', '/libro']
const casi = JSON.parse(readFileSync(new URL('../src/data/casi-index.json', import.meta.url), 'utf8'))

const urls = [...pages, ...casi.map((c) => `/testimonianze/${c.slug}`)]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${BASE}${u}</loc></url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
