const express = require('express');
const logger = require('morgan');

const app = express();


const PORT = 4000;
const ADDRESS = '0.0.0.0';

app.listen(PORT, ADDRESS, () => {
  console.log(`Listening => port: ${PORT} Address: ${ADDRESS}`)
});