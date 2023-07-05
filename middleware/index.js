/**
 * Middleware are functions that have access to the request object (req), 
 * the response object (res), and the next middleware function in the application’s 
 * request-response cycle.
 * 
 * The next middleware function is commonly denoted by a variable named next.
 * 
 */

const express = require('express');
const app = express()


app.use(logger) // middleware  | Log, Auth, Home Page

app.get('/', auth, (req, res) =>  {
  console.log('Home page');
  res.send('Home Page')
})


app.get('/users',(req, res, next) =>  {
  console.log('Users page');
  res.send('Users Page')
  next()
})


function logger(req, res, next){
  console.log('Log');
  next()
}

function auth(req, res, next){
  console.log('Auth');
  next()
}

app.listen(3000)


// var express = require('express')
// var morgan = require('morgan')
// var uuid = require('node-uuid')

// const PORT = 5000

// morgan.token('id', function getId (req) {
//   return req.id
// })

// var app = express()

// app.use(assignId)
// app.use(morgan(':id :method :url :response-time'))

// app.get('/', function (req, res) {
//   res.send('hello, world!')
// })

// function assignId (req, res, next) {
//   req.id = uuid.v4()
//   next()
// }

// app.listen(PORT)
// console.log(`Server is running at port: ${PORT}`)