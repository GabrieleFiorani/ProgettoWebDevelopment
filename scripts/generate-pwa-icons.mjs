import { deflateSync } from 'node:zlib'
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const INDIGO = [79, 70, 229]
const WHITE = [255, 255, 255]

function crc32(buffer) {
  let crc = ~0
  for (const byte of buffer) {
    crc ^= byte
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1))
    }
  }
  return ~crc >>> 0
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const crcBuf = Buffer.concat([typeBuf, data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(crcBuf))
  return Buffer.concat([length, typeBuf, data, crc])
}

function roundedRect(size, padding) {
  const inner = size - padding * 2
  const radius = inner * 0.22
  return { x: padding, y: padding, w: inner, h: inner, r: radius }
}

function inRoundedRect(px, py, rect) {
  const { x, y, w, h, r } = rect
  if (px < x || py < y || px >= x + w || py >= y + h) return false
  const lx = px - x
  const ly = py - y
  if (lx < r && ly < r) return (lx - r) ** 2 + (ly - r) ** 2 <= r ** 2
  if (lx > w - r && ly < r) return (lx - (w - r)) ** 2 + (ly - r) ** 2 <= r ** 2
  if (lx < r && ly > h - r) return (lx - r) ** 2 + (ly - (h - r)) ** 2 <= r ** 2
  if (lx > w - r && ly > h - r) {
    return (lx - (w - r)) ** 2 + (ly - (h - r)) ** 2 <= r ** 2
  }
  return true
}

function inLetterW(px, py, size, pad) {
  const x0 = pad + size * 0.22
  const x1 = pad + size * 0.78
  const y0 = pad + size * 0.28
  const y1 = pad + size * 0.72
  const stroke = Math.max(4, size * 0.075)
  const mid = (x0 + x1) / 2
  const t = (py - y0) / (y1 - y0)
  if (t < 0 || t > 1) return false

  const left = x0 + (mid - x0) * t
  const right = x1 - (x1 - mid) * t
  const leftUp = x0 + ((x0 + mid) / 2 - x0) * (1 - t)
  const rightUp = x1 - (x1 - (mid + x1) / 2) * (1 - t)

  const dist = Math.min(
    Math.abs(px - left),
    Math.abs(px - right),
    py > (y0 + y1) / 2 ? Math.abs(px - leftUp) : Infinity,
    py > (y0 + y1) / 2 ? Math.abs(px - rightUp) : Infinity,
  )

  return dist <= stroke / 2 && px >= x0 - stroke && px <= x1 + stroke
}

function makePng(size, { padding }) {
  const rect = roundedRect(size, padding)
  const letterPad = padding
  const raw = Buffer.alloc(size * (1 + size * 3))

  for (let y = 0; y < size; y += 1) {
    const row = y * (1 + size * 3)
    raw[row] = 0
    for (let x = 0; x < size; x += 1) {
      const i = row + 1 + x * 3
      let color = [15, 23, 42]
      if (inRoundedRect(x + 0.5, y + 0.5, rect)) color = INDIGO
      if (inLetterW(x + 0.5, y + 0.5, size, letterPad)) color = WHITE
      raw[i] = color[0]
      raw[i + 1] = color[1]
      raw[i + 2] = color[2]
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(size, 0)
  ihdr.writeUInt32BE(size, 4)
  ihdr[8] = 8
  ihdr[9] = 2

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw)),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

const icons = [
  ['pwa-192x192.png', 192, 12],
  ['pwa-512x512.png', 512, 32],
  ['pwa-maskable-512x512.png', 512, 90],
  ['apple-touch-icon.png', 180, 12],
]

for (const [name, size, padding] of icons) {
  writeFileSync(join(publicDir, name), makePng(size, { padding }))
}

console.log('Icone PWA generate in public/')
