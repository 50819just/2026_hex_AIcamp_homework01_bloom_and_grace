import fs from 'node:fs'
import path from 'node:path'

const dataDir = path.join(process.cwd(), 'server', 'data')
const dataFilePath = path.join(dataDir, 'products.json')

function ensureDataFile() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]', 'utf8')
  }
}

export function readProducts() {
  ensureDataFile()
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf8'))
}

export function writeProducts(products) {
  ensureDataFile()
  fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2), 'utf8')
}
