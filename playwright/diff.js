// Compara cada PNG de figma-frames/ contra el screenshot del mismo nombre
// en screenshots/ (generado con `npm run screenshots`), pixel por pixel.
// Genera un PNG en diff-output/ con las diferencias resaltadas en rojo.
//
// Uso:
//   1. npm run dev            (server corriendo)
//   2. npm run screenshots    (genera screenshots/*.png)
//   3. Poné tus exportados de Figma en figma-frames/ con el MISMO nombre
//      que la pantalla (p. ej. figma-frames/plantillas.png)
//   4. npm run diff

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { PNG } from 'pngjs'
import pixelmatch from 'pixelmatch'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const FIGMA_DIR = path.join(__dirname, 'figma-frames')
const SHOT_DIR = path.join(__dirname, 'screenshots')
const OUT_DIR = path.join(__dirname, 'diff-output')

fs.mkdirSync(OUT_DIR, { recursive: true })

const figmaFiles = fs
  .readdirSync(FIGMA_DIR)
  .filter((f) => f.toLowerCase().endsWith('.png'))

if (figmaFiles.length === 0) {
  console.log(`No hay PNG en ${path.relative(process.cwd(), FIGMA_DIR)}/ todavía.`)
  process.exit(0)
}

for (const file of figmaFiles) {
  const figmaPath = path.join(FIGMA_DIR, file)
  const shotPath = path.join(SHOT_DIR, file)

  if (!fs.existsSync(shotPath)) {
    console.log(`✗ ${file}: no hay screenshot con ese nombre en screenshots/ (corré "npm run screenshots")`)
    continue
  }

  const img1 = PNG.sync.read(fs.readFileSync(figmaPath))
  const img2 = PNG.sync.read(fs.readFileSync(shotPath))

  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.log(
      `✗ ${file}: tamaños distintos — figma ${img1.width}x${img1.height} vs app ${img2.width}x${img2.height} (exportá el frame de Figma a 1920x1080)`,
    )
    continue
  }

  const { width, height } = img1
  const diff = new PNG({ width, height })
  const diffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, {
    threshold: 0.1,
  })

  const totalPixels = width * height
  const percent = ((diffPixels / totalPixels) * 100).toFixed(2)
  const outPath = path.join(OUT_DIR, file.replace(/\.png$/, '-diff.png'))
  fs.writeFileSync(outPath, PNG.sync.write(diff))

  console.log(`${file}: ${percent}% distinto (${diffPixels} px) -> ${path.relative(process.cwd(), outPath)}`)
}
