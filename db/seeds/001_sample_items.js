/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del();
  
  // Inserts seed entries
  await knex('items').insert([
    {
      name: 'Sample Item 1',
      description: 'This is a sample item for testing',
      price: 19.99,
      is_active: true
    },
    {
      name: 'Sample Item 2',
      description: 'Another sample item for demonstration',
      price: 29.99,
      is_active: true
    },
    {
      name: 'Inactive Item',
      description: 'This item is inactive',
      price: 9.99,
      is_active: false
    }
  ]);
}; 