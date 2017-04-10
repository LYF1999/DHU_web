const express = require('express');
const swig = require('swig');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const blogRouter = require('./src/blog/router');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const debug = process.env.NODE_ENV === 'development';

swig.setDefaults({
  cache: debug ? false : 'memory',
  encoding: 'utf8',
});


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'templates'));


app.get('/', (req, res) => {
  res.render('index.html', { content: 'hello world' });
});


app.use('/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = debug ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
