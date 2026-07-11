import fs from 'node:fs'
import path from 'node:path'
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dataDir = path.join(__dirname, 'data')
const dbPath = path.join(dataDir, 'app.db')
const productsJsonPath = path.join(dataDir, 'products.json')
const membersJsonPath = path.join(dataDir, 'members.json')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

export const db = new DatabaseSync(dbPath)

db.exec(`
  PRAGMA foreign_keys = ON;

  CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    original_price INTEGER NOT NULL,
    member_price INTEGER NOT NULL,
    description TEXT NOT NULL,
    tag TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    level TEXT NOT NULL,
    joined_at TEXT NOT NULL,
    birthday TEXT NOT NULL,
    cart_count INTEGER NOT NULL DEFAULT 0,
    saved_recipients INTEGER NOT NULL DEFAULT 0,
    yearly_orders INTEGER NOT NULL DEFAULT 0,
    member_discount_label TEXT NOT NULL DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS member_favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id TEXT NOT NULL,
    category TEXT NOT NULL,
    FOREIGN KEY(member_id) REFERENCES members(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS member_addresses (
    id TEXT PRIMARY KEY,
    member_id TEXT NOT NULL,
    label TEXT NOT NULL,
    recipient TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    note TEXT NOT NULL,
    FOREIGN KEY(member_id) REFERENCES members(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS member_orders (
    id TEXT PRIMARY KEY,
    member_id TEXT NOT NULL,
    order_date TEXT NOT NULL,
    item TEXT NOT NULL,
    amount INTEGER NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY(member_id) REFERENCES members(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS ecpay_orders (
    merchant_trade_no TEXT PRIMARY KEY,
    order_input TEXT,
    checkout_fields TEXT,
    browser_return_result TEXT,
    return_notify_result TEXT,
    query_result TEXT,
    payment_status TEXT NOT NULL DEFAULT 'created',
    browser_callback_verified INTEGER NOT NULL DEFAULT 0,
    return_callback_verified INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    browser_returned_at TEXT,
    return_notified_at TEXT,
    last_queried_at TEXT
  );
`)

function readSeedFile(filePath, fallback = []) {
  if (!fs.existsSync(filePath)) {
    return fallback
  }

  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function seedProductsIfNeeded() {
  const count = db.prepare('SELECT COUNT(*) AS count FROM products').get().count
  if (count > 0) {
    return
  }

  const products = readSeedFile(productsJsonPath)
  const insertProduct = db.prepare(`
    INSERT INTO products (
      id, name, category, image, original_price, member_price, description, tag, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN')
  try {
    for (const product of products) {
      insertProduct.run(
        product.id,
        product.name,
        product.category,
        product.image,
        product.originalPrice,
        product.memberPrice,
        product.description,
        product.tag,
        product.createdAt || new Date().toISOString(),
        product.updatedAt || new Date().toISOString(),
      )
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

function seedMembersIfNeeded() {
  const count = db.prepare('SELECT COUNT(*) AS count FROM members').get().count
  if (count > 0) {
    return
  }

  const members = readSeedFile(membersJsonPath)

  const insertMember = db.prepare(`
    INSERT INTO members (
      id, name, email, phone, level, joined_at, birthday, cart_count, saved_recipients, yearly_orders, member_discount_label
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const insertFavorite = db.prepare('INSERT INTO member_favorites (member_id, category) VALUES (?, ?)')
  const insertAddress = db.prepare(`
    INSERT INTO member_addresses (id, member_id, label, recipient, phone, address, note)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)
  const insertOrder = db.prepare(`
    INSERT INTO member_orders (id, member_id, order_date, item, amount, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  db.exec('BEGIN')
  try {
    for (const member of members) {
      insertMember.run(
        member.id,
        member.name,
        member.email,
        member.phone,
        member.level,
        member.joinedAt,
        member.birthday,
        member.stats?.cartCount || 0,
        member.stats?.savedRecipients || 0,
        member.stats?.yearlyOrders || 0,
        member.stats?.memberDiscountLabel || '',
      )

      for (const category of member.favoriteCategories || []) {
        insertFavorite.run(member.id, category)
      }

      for (const address of member.addresses || []) {
        insertAddress.run(
          address.id,
          member.id,
          address.label,
          address.recipient,
          address.phone,
          address.address,
          address.note,
        )
      }

      for (const order of member.orders || []) {
        insertOrder.run(
          order.id,
          member.id,
          order.date,
          order.item,
          order.amount,
          order.status,
        )
      }
    }
    db.exec('COMMIT')
  } catch (error) {
    db.exec('ROLLBACK')
    throw error
  }
}

function ensureOneDollarTestProduct() {
  db.prepare(`
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
  `).run(
    'test-flower-1-dollar',
    '人造花用具',
    'potted',
    'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=900&auto=format&fit=crop&q=80',
    1,
    1,
    '人造花材整理與包裝用的小型測試商品，方便快速確認購物與付款流程。',
    '$1 測試商品',
    '2026-07-11T00:00:00.000Z',
    new Date().toISOString(),
  )
}

seedProductsIfNeeded()
seedMembersIfNeeded()
ensureOneDollarTestProduct()
