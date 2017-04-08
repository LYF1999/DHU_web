const express = require('express');
const swig = require('swig');
const path = require('path');
const app = express();

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));

app.get('/', (req, res) => {
  res.render('index.html', {content: 'hello world'});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
