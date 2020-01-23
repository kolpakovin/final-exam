var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Hesoyam321',
  database : 'guessNumber'
});

module.exports = connection;