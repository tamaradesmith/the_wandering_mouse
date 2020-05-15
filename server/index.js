const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(cors());

const score = require('./routes/score');
app.use('/scores', score);


const PORT = 4040;
const ADDRESS = '0.0.0.0';


app.listen(PORT, ADDRESS, () => {
  console.log(`Listening => port: ${PORT} Address: ${ADDRESS}`)
});