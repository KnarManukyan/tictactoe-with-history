const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tic_tac_toe'
})

connection.connect((error) => {(!!error ? console.log('Error') : console.log('Connected'))})
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());

app.get('/', function (req, res) {
  connection.query('SELECT * FROM winners', function(error, result){
    if(!!error){
      console.log('Error in the query' + error);
    }
    res.json(result);
  })
})
app.post('/', function (req, res) {
  const query = "INSERT INTO winners (winner, dayAndTime) VALUES('" + req.body.winner + "', NOW())";
  const check = (error) => {(!!error ? console.log(error) : console.log("Succesfull connection"))}
  connection.query(query, check);
})

app.listen(3000, () => console.log('App listening on port 3000!'));
