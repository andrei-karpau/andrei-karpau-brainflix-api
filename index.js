const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
// const PORT = 8080;

app.listen(process.env.PORT || PORT, () => console.log(`server is listening on PORT ${process.env.PORT || PORT}`));

app.use(express.static('public'));
app.use(express.json());
app.use(cors());
