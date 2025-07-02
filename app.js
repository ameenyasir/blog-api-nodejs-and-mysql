const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.get('/blog', (req, res) => {
//   res.send('Hello, Blog!');
// });

const postsRoute = require('./routes/posts');

app.use(bodyParser.json());

app.use('/posts', postsRoute)

module.exports = app;

