const Item = require('../models/Item');

// Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.getAll();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get item by ID
const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.getById(id);
    
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get active items only
const getActiveItems = async (req, res) => {
  try {
    const items = await Item.getActive();
    res.json(items);
  } catch (error) {
    console.error('Error fetching active items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    const { name, description, price, is_active } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    const itemData = {
      name,
      description: description || null,
      price: price || null,
      is_active: is_active !== undefined ? is_active : true
    };
    
    const newItem = await Item.create(itemData);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const existingItem = await Item.getById(id);
    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    const updatedItem = await Item.update(id, updateData);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    const existingItem = await Item.getById(id);
    if (!existingItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    await Item.delete(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  getActiveItems,
  createItem,
  updateItem,
  deleteItem
}; 