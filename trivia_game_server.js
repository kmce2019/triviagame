const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3080;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/question', async (req, res) => {
  try {
    const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
    const data = await response.json();
    if (data.response_code === 0) {
      res.json(data.results[0]);
    } else {
      res.status(500).json({ error: 'Failed to fetch trivia question.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching question.' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
