import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const dataDir = path.join(__dirname, 'data')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

export function readJsonFile(fileName, fallbackValue) {
  const filePath = path.join(dataDir, fileName)

  if (!fs.existsSync(filePath)) {
    return structuredClone(fallbackValue)
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8')
    if (!content.trim()) {
      return structuredClone(fallbackValue)
    }

    return JSON.parse(content)
  } catch {
    return structuredClone(fallbackValue)
  }
}

export function writeJsonFile(fileName, data) {
  const filePath = path.join(dataDir, fileName)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}
