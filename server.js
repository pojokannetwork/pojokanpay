const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Low, JSONFile } = require('lowdb');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Setup lowdb
const { JSONFile } = require('lowdb')
const file = path.join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);
async function initDB() {
  await db.read();
  db.data = db.data || { customers: [], employees: [], positions: [], roles: [], assets: [] };
  await db.write();
}
initDB();

// CRUD endpoints generator
const resources = ['customers', 'employees', 'positions', 'roles', 'assets'];
resources.forEach(resource => {
  app.get('/api/' + resource, async (req, res) => {
    await db.read();
    res.json(db.data[resource]);
  });
  app.post('/api/' + resource, async (req, res) => {
    await db.read();
    const item = req.body;
    item.id = Date.now();
    db.data[resource].push(item);
    await db.write();
    res.json(item);
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
