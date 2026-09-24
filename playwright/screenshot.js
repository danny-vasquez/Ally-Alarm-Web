// Saca capturas a 1920x1080 de cada pantalla de la app para compararlas
// a ojo contra los PNG exportados de Figma que pongas en figma-frames/.
//
// Uso:
//   1. En una terminal: npm run dev   (deja el server corriendo)
//   2. En otra terminal: npm run screenshots
//
// Las capturas quedan en playwright/screenshots/<nombre>.png

import { chromium } from 'playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const BASE_URL = process.env.BASE_URL || 'http://localhost:5173'
const OUT_DIR = path.join(__dirname, 'screenshots')

// Agregá una fila por cada pantalla nueva que quieras comparar.
const PAGES = [
  { path: '/', name: 'inicio' },
  { path: '/plantillas', name: 'plantillas' },
  { path: '/categorias', name: 'categorias' },
  { path: '/configuracion', name: 'configuracion' },
  { path: '/configuracion/gestion-dispositivos', name: 'gestion-dispositivos' },
]

async function main() {
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })

  for (const { path: route, name } of PAGES) {
    const url = `${BASE_URL}${route}`
    try {
      await page.goto(url, { waitUntil: 'networkidle' })
      await page.screenshot({ path: path.join(OUT_DIR, `${name}.png`), fullPage: true })
      console.log(`✓ ${name}.png`)
    } catch (error) {
      console.error(`✗ ${name} (${url}):`, error.message)
    }
  }

  await browser.close()
  console.log(`\nListo. Compará playwright/screenshots/ contra playwright/figma-frames/`)
}

main()
