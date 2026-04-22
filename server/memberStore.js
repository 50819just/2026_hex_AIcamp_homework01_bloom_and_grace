import { db } from './db.js'

function mapMember(memberRow) {
  const favoriteCategories = db
    .prepare('SELECT category FROM member_favorites WHERE member_id = ? ORDER BY id ASC')
    .all(memberRow.id)
    .map((row) => row.category)

  const addresses = db
    .prepare(`
      SELECT id, label, recipient, phone, address, note
      FROM member_addresses
      WHERE member_id = ?
      ORDER BY id ASC
    `)
    .all(memberRow.id)

  const orders = db
    .prepare(`
      SELECT id, order_date, item, amount, status
      FROM member_orders
      WHERE member_id = ?
      ORDER BY datetime(order_date) DESC
    `)
    .all(memberRow.id)
    .map((order) => ({
      id: order.id,
      date: order.order_date,
      item: order.item,
      amount: order.amount,
      status: order.status,
    }))

  return {
    id: memberRow.id,
    name: memberRow.name,
    email: memberRow.email,
    phone: memberRow.phone,
    level: memberRow.level,
    joinedAt: memberRow.joined_at,
    birthday: memberRow.birthday,
    favoriteCategories,
    stats: {
      cartCount: memberRow.cart_count,
      savedRecipients: memberRow.saved_recipients,
      yearlyOrders: memberRow.yearly_orders,
      memberDiscountLabel: memberRow.member_discount_label,
    },
    addresses,
    orders,
  }
}

export function readMembers() {
  return db
    .prepare(`
      SELECT id, name, email, phone, level, joined_at, birthday, cart_count, saved_recipients, yearly_orders, member_discount_label
      FROM members
      ORDER BY datetime(joined_at) DESC, name COLLATE NOCASE ASC
    `)
    .all()
    .map(mapMember)
}
