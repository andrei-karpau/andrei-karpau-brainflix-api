const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
}, (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next()
  }, (req, res, next) => {
    console.log('Request Type:', req.method)
    next()
});

const videos = require('./routes/videos');

app.use(videos);

