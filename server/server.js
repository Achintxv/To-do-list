const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('./db');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Sign up
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashed]);
    res.json({ message: 'User registered!' });
  } catch (err) {
    res.status(500).json({ message: 'User already exists!' });
  }
});

// Sign in
app.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    if (result.rows.length === 0) return res.status(400).json({ message: 'Invalid username!' });

    const valid = await bcrypt.compare(password, result.rows[0].password);
    if (!valid) return res.status(400).json({ message: 'Invalid password!' });

    res.json({ message: 'Signed in!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get tasks
app.get('/tasks', async (req, res) => {
  const result = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
  res.json(result.rows);
});

// Add task
app.post('/tasks', async (req, res) => {
  const { description } = req.body;
  await pool.query('INSERT INTO tasks (description) VALUES ($1)', [description]);
  res.json({ message: 'Task added!' });
});

// Delete task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  res.json({ message: 'Task deleted!' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));