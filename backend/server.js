const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
mongoose.connect('mongodb://localhost:27017/wellnessDB')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Use Routes
app.use('/api', apiRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));