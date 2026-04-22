import { db } from './db.js'

function mapProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    image: row.image,
    originalPrice: row.original_price,
    memberPrice: row.member_price,
    description: row.description,
    tag: row.tag,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function readProducts() {
  return db
    .prepare(`
      SELECT id, name, category, image, original_price, member_price, description, tag, created_at, updated_at
      FROM products
      ORDER BY datetime(created_at) DESC
    `)
    .all()
    .map(mapProductRow)
}

export function writeProducts(products) {
  const deleteMissing = db.prepare('DELETE FROM products WHERE id = ?')
  const upsertProduct = db.prepare(`
    INSERT INTO products (
      id, name, category, image, original_price, member_price, description, tag, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name = excluded.name,
      category = excluded.category,
      image = excluded.image,
      original_price = excluded.original_price,
      member_price = excluded.member_price,
      description = excluded.description,
      tag = excluded.tag,
      updated_at = excluded.updated_at
  `)

  const nextIds = new Set(products.map((row) => row.id))
  const existingIds = db.prepare('SELECT id FROM products').all().map((row) => row.id)

  db.exec('BEGIN')
  try {
    for (const product of products) {
      upsertProduct.run(
        product.id,
        product.name,
        product.category,
        product.image,
        product.originalPrice,
        product.memberPrice,
        product.description,
        product.tag,
        product.createdAt,
        product.updatedAt,
      )
    }

    for (const existingId of existingIds) {
      if (!nextIds.has(existingId)) {
        deleteMissing.run(existingId)
      }
    }

    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}
