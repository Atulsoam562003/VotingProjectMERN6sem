require('dotenv').config();
const express = require('express');
const handle = require('./handlers')
const routes = require('./routes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/' , (req , res) => { res.json("Hello World");});

app.use('/api/auth' , routes.auth);

app.use(handle.notFound);

app.use(handle.errors);

app.listen(port , console.log(`server is started on port ${port}`));