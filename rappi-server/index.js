'use strict'

const express = require('express')
const app = express()
const router = require('./routes')
const passport = require('./passport-config')
var session = require('express-session')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')




app.use(cookieParser())
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())
app.use(session({
  secret: 'cats',
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(express.static('public'))
app.use('/', router)
app.listen(process.env.PORT || 80, (err) => {
  console.log(process.env.PORT)
  if (err) throw err
  console.log('server runnig  http://localhost:3000/')
})