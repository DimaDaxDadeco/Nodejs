var express = require('express');
var handlebars = require('express-handlebars');

var app = express();

// Подключение статики
app.use(express.static(__dirname + '/public'));
// Настройка шаблонизатора handlebars
app.engine(
  '.hbs',
  handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
  })
);
app.set('view engine', '.hbs');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  res.render('about', { content: 'Я константа' });
});

app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log('Запущено на http://localhost:' + app.get('port'));
});