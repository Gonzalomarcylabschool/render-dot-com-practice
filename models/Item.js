const db = require('../db/connection');

class Item {
  static async getAll() {
    return await db('items').select('*');
  }

  static async getById(id) {
    return await db('items').where({ id }).first();
  }

  static async getActive() {
    return await db('items').where({ is_active: true }).select('*');
  }

  static async create(itemData) {
    const [item] = await db('items').insert(itemData).returning('*');
    return item;
  }

  static async update(id, itemData) {
    const [item] = await db('items').where({ id }).update(itemData).returning('*');
    return item;
  }

  static async delete(id) {
    return await db('items').where({ id }).del();
  }
}

module.exports = Item; 