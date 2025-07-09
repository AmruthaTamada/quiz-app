// server/server.js

require('dotenv').config();

// 1. Require necessary modules
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const HighScore = require('./models/HighScore');

const app = express();
const PORT = process.env.PORT || 5000;

// --- CORS Configuration ---
const corsOptions = {
  origin: ['http://localhost:3000', 'https://interact-quiz-app.netlify.app'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// --- MongoDB Connection ---
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in .env');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err.message));

mongoose.connection.on('error', err => console.error('❌ MongoDB runtime error:', err));
mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected.'));
mongoose.connection.on('reconnected', () => console.log('MongoDB reconnected.'));

process.on('SIGINT', async () => {
  console.log('SIGINT received. Closing MongoDB connection...');
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error closing MongoDB:', err);
    process.exit(1);
  }
});

// --- Load Quiz Data ---
let quizData = [];
let availableTopics = [];

try {
  const dataPath = path.join(__dirname, 'quizData.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const parsedData = JSON.parse(rawData);

  if (Array.isArray(parsedData)) {
    quizData = parsedData;
    const topicSet = new Set();

    parsedData.forEach(q => {
      if (q.topic && typeof q.topic === 'string') topicSet.add(q.topic);
    });

    availableTopics = Array.from(topicSet);
    console.log(`✅ Loaded ${quizData.length} questions.`);
    console.log(`🧠 Topics: ${availableTopics.join(', ')}`);
  } else {
    console.error('❌ quizData.json must contain an array of questions.');
  }
} catch (err) {
  console.error('❌ Error reading quizData.json:', err.message);
}

// --- API Routes ---

app.get('/', (req, res) => {
  const dataStatus = quizData.length > 0
    ? `Quiz data loaded (${quizData.length} questions).`
    : 'Quiz data failed to load or is empty.';
  const topicsStatus = availableTopics.length > 0
    ? `Topics identified: ${availableTopics.join(', ')}.`
    : 'No topics identified.';
  res.send(`Hello from your Interactive Quiz API Server! CORS is enabled. ${dataStatus} ${topicsStatus}`);
});

app.get('/api/questions', (req, res) => {
  const topic = req.query.topic;
  const filtered = topic
    ? quizData.filter(q => q.topic === topic)
    : quizData;

  console.log(`📤 Sending ${filtered.length} questions for topic: ${topic || 'All'}`);
  res.json(filtered);
});

app.get('/api/topics', (req, res) => {
  console.log(`📤 Sending ${availableTopics.length} topics`);
  res.json(availableTopics);
});

app.get('/api/highscores', async (req, res) => {
  console.log('GET /api/highscores');
  try {
    const scores = await HighScore.find({})
      .sort({ score: -1 })
      .limit(10)
      .select('name score date');
    res.json(scores);
  } catch (err) {
    console.error('❌ Failed to fetch highscores:', err.message);
    res.status(500).json({ message: 'Failed to retrieve high scores.' });
  }
});

app.post('/api/highscores', async (req, res) => {
  console.log('POST /api/highscores:', req.body);
  try {
    const { name, score } = req.body;
    if (!name || typeof score !== 'number') {
      return res.status(400).json({ message: 'Name and score are required. Score must be a number.' });
    }
    const newScore = await HighScore.create({ name, score });
    res.status(201).json(newScore);
  } catch (err) {
    console.error('❌ Failed to save high score:', err.message);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ message: 'Validation Error', errors: messages });
    }
    res.status(500).json({ message: 'Failed to save high score.' });
  }
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`🎉 Server running at http://localhost:${PORT}`);
});
