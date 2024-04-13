
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();


mongoose.connect("mongodb+srv://boooeditz:boobalandb@cluster0.8f7yl8j.mongodb.net/", {
  family:4
}).then(() => {
  console.log('Connection to MongoDB established successfully');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(fileUpload());
app.use('/api/user', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
