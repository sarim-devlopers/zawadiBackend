const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const carRoutes = require('./routes/carRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', carRoutes);

mongoose.connect('mongodb+srv://vinitsiwach06:vinit123si@cluster.8zhkgak.mongodb.net/Testing', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
