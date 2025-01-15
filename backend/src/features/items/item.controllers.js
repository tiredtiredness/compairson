import prisma from '../../configs/db.js';

export const getItems = async (req, res) => {
  try {
    const { id } = req.params;
    const items = await prisma.item.findMany({ where: { listId: id } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Unable to fetch items' });
  }
};

export const createItem = async (req, res) => {
  try {
    const { name, listId } = req.body;
    const newItem = await prisma.item.create({ data: { name, listId } });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: 'Unable to create item' });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id, name } = req.body;
    const updatedItem = await prisma.item.update({
      where: { id },
      data: { name },
    });
    res.status(201).json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: 'Unable to update item' });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id } });
  } catch (error) {
    res.status(400).json({ error: 'Unable to delete item' });
  }
};
