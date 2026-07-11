import { readJsonFile, writeJsonFile } from './fileStore.js'

const PRODUCTS_FILE = 'products.json'

function compareProducts(leftProduct, rightProduct) {
  return new Date(rightProduct.createdAt).getTime() - new Date(leftProduct.createdAt).getTime()
}

export function readProducts() {
  return readJsonFile(PRODUCTS_FILE, []).sort(compareProducts)
}

export function writeProducts(products) {
  writeJsonFile(PRODUCTS_FILE, [...products].sort(compareProducts))
}
