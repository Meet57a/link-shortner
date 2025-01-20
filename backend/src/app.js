const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use('/api/v1', require('./routes'));

app.use("*", (req, res) => {
    res.status(404).send({message: "Not Foundddddddddddd"});
})

module.exports = app;