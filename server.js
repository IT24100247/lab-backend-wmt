require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// MongoDB
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('MONGO_URI missing');
  process.exit(1);
}

// connect DB
mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => {
    console.log('MongoDB error:', err);
  });

// ✅ IMPORTANT: always start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});