const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csvtojson');
const { Parser } = require('json2csv');
const Customer = require('../models/customer');
const upload = multer({ dest: 'uploads/' });
async function exportModel(Model, fields, filename, res) {
  const rows = await Model.findAll();
  const data = rows.map(r => r.toJSON());
  const parser = new Parser({ fields });
  const csvData = parser.parse(data);
  res.header('Content-Type', 'text/csv');
  res.attachment(filename);
  res.send(csvData);
}
router.get('/export/customers', (req, res) =>
  exportModel(Customer, ['id','username','name','address','phone','package_id','status'], 'customers.csv', res)
);
async function importModel(Model, path, mapper) {
  const arr = await csv().fromFile(path);
  const recs = arr.map(mapper);
  return Model.bulkCreate(recs);
}
router.post('/import/customers', upload.single('file'), async (req, res) => {
  try {
    await importModel(Customer, req.file.path, row => ({
      username: row.username, password: row.password,
      name: row.name, address: row.address,
      phone: row.phone, package_id: row.package_id,
      status: row.status
    }));
    res.json({ message: 'Imported' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
module.exports = router;
