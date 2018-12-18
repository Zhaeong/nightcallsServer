const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.use(cors())


//Project specific functions
const postgres = require('./database/postgres.js');

app.get('/', (req, res) => {
  res.send("Hello, welcome")
})


app.get('/posts', (req, res) => {
  res.send(
    [{
      firstkey: "aaaaaAA",
      secondkey: "bbbbBB"
    }]
  )
})


app.post('/register', function (req, res) {
  console.log("Register Request Received")

  var request = req.body

  var username = req.body.username

  var password = req.body.password

  if (typeof username !== 'undefined' && typeof password !== 'undefined')
  {
  	console.log("Username: " + req.body.username)
  	console.log("Password: " + req.body.password)

  	postgres.createUser(username, password, (result) => 
	{
		console.log("postgres Result:" + result);
		res.send(result)
	});
  }
  else
  {
  	console.log("Request does not have parameters defined")
  	res.send(req.body)
  }
  
})


app.post('/login', function (req, res) {
  console.log("Login Request Received")

  var request = req.body

  var username = req.body.username

  var password = req.body.password

  if (typeof username !== 'undefined' && typeof password !== 'undefined')
  {
  	console.log("Username: " + req.body.username)
  	console.log("Password: " + req.body.password)

  	postgres.loginUser(username, password, (result) => 
	{
		console.log("postgres Result:" + result);
		res.send(result)
	});
  }
  else
  {
  	console.log("Request does not have parameters defined")
  	res.send(req.body)
  }
  
})

app.listen(process.env.PORT || 8081)