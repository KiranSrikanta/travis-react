var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var gzipStatic = require('connect-gzip-static');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

if (process.env.NODE_ENV != 'production') {
  var webpack = require('webpack');
  var webpackMiddleware = require("webpack-dev-middleware");
  var webpackHotMiddleware = require("webpack-hot-middleware");
  var webpackConfig = require('../../webpack.config.dev');
  var compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler,
    {
      noInfo: true,
      quiet: true,
      publicPath: webpackConfig.output.publicPath
    }));

  app.use(webpackHotMiddleware(compiler));
}

var STATIC_FILES_DIR = path.resolve(__dirname, '../client/public');
app.use(gzipStatic(STATIC_FILES_DIR));
//app.use(express.static(STATIC_FILES_DIR));

var todos = [{
  id: 'task1',
  title: 'task1',
  description: 'important task',
  date: new Date(),
  completed: false
}];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

const generateId = (courseTitle) => {
  return replaceAll(courseTitle, ' ', '-');
};

app.get('/api/todos', function (req, res) {
  console.log('GET: api/todo');
  console.log(todos);
  res.json(todos);
});

app.post('/api/todos', function (req, res) {
  console.log('POST: api/todo');
  var todo = req.body;

  todo.id = generateId(todo.title);

  todos.push(todo);

  res.json(todo);
  console.log(todo);
});

app.get('/api/todos/:id', function (req, res) {
  console.log('GET: api/todo/:id');
  for (var i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i].id) {
      res.json(todos[i]);
      console.log(todos[i]);
    }
  }

  res.status(404);
});

app.put('/api/todos/:id', function (req, res) {
  console.log('PUT: api/todo/:id');
  for (var i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i].id) {
      let todo = todos[i];
      var todoReq = req.body;
      todo.title = todoReq.title;
      todo.description = todoReq.description;
      todo.date = new Date(todoReq.date);
      todo.completed = todoReq.completed;
      res.json(todo);
      console.log(todo);
    }
  }

  res.status(404);
});

app.delete('/api/todos/:id', function (req, res) {
  console.log('DELETE: api/todo/:id');
  var todo_id;
  for (var i = 0; i < todos.length; i++) {
    if (req.params.id == todos[i].id) {
      todo_id = i;
    }
  }

  if (todo_id) {
    todos.splice(todo_id);
    console.log(todo_id);
    res.status(200);
  }
  else
    res.status(404);
});

app.listen(3000, function () {
  console.log(`express app listening on port 3000! in ${process.env.NODE_ENV} mode`);
});