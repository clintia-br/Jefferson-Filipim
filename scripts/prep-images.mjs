import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = String.raw`C:\Users\Leandro\AppData\Local\Temp\claude\C--Users-Leandro-Desktop-Claudinho-Alpha\d24d6e09-d334-49d9-a47b-0844d59d0357\scratchpad\assets`
const OUT = String.raw`C:\Users\Leandro\Desktop\Claudinho Alpha\public\images`

await mkdir(OUT, { recursive: true })

// The bundle ships originals straight from the design tool: an 8.4 MB 5524px
// photo alongside 512px avatars. Cap each at the largest size the layout can
// actually render at 2x, and keep the logo/portraits as PNG for transparency.
const jobs = [
  { in: '07ddbcec-76cb-4795-bef1-a594ba9545a0.png', out: 'logo.png', width: 515, fmt: 'png' },
  { in: 'fb753611-b360-45de-88c6-7480f2f32348.png', out: 'hero.png', width: 780, fmt: 'png' },
  { in: 'd4d1a1d6-e33b-4ea3-ae48-b000c0bb28ca.png', out: 'about.png', width: 512, fmt: 'png' },
  { in: '75545db8-c90b-4aa5-8c38-2011727a8bbb.jpg', out: 'decline.jpg', width: 1600, fmt: 'jpeg' },
]

for (const j of jobs) {
  const pipeline = sharp(path.join(SRC, j.in)).resize({
    width: j.width,
    withoutEnlargement: true,
  })
  const img =
    j.fmt === 'png'
      ? pipeline.png({ compressionLevel: 9, palette: true })
      : pipeline.jpeg({ quality: 82, mozjpeg: true })

  const info = await img.toFile(path.join(OUT, j.out))
  console.log(
    `${j.out.padEnd(12)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)}  ${(info.size / 1024).toFixed(1)} KB`,
  )
}
