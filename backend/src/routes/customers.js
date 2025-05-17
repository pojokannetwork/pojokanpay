const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
// GET all
router.get('/', async (req, res) => {
  const list = await Customer.findAll();
  res.json(list);
});
// GET one
router.get('/:id', async (req, res) => {
  const c = await Customer.findByPk(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  res.json(c);
});
// CREATE
router.post('/', async (req, res) => {
  try {
    const c = await Customer.create(req.body);
    res.status(201).json(c);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});
// UPDATE
router.put('/:id', async (req, res) => {
  const c = await Customer.findByPk(req.params.id);
  if (!c) return res.status(404).json({ error: 'Not found' });
  await c.update(req.body);
  res.json(c);
});
// DELETE
router.delete('/:id', async (req, res) => {
  const rows = await Customer.destroy({ where: { id: req.params.id }});
  if (!rows) return res.status(404).json({ error: 'Not found' });
  res.json({ message: 'Deleted' });
});
module.exports = router;
