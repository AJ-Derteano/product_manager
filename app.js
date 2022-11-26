require('dotenv').config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('storage'));

const port = process.env.PORT || 3000;

app.use('/', require('./routes'))

app.listen(port, () => {
  console.log(`API EXPOSE IN: http://127.0.0.1:${port}`)
})