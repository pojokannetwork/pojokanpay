const express = require('express');
const axios = require('axios');
const router = express.Router();
router.post('/', async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await axios.post(`${process.env.OLLAMA_URL}/v1/chat/completions`, {
      model: process.env.OLLAMA_MODEL,
      messages
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OLLAMA_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ollama chat error' });
  }
});
module.exports = router;
