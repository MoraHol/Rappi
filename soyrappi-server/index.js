'use strict'

// modulos para montaje del servidor

const express = require('express')
const app = express()
const router = require('./routes')
const passport = require('./passport-config')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
// motor de plantillas ejs

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// los necesitaremos mas adelante para el tema de sesiones
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

// inicializacion de passport
app.use(passport.initialize())
app.use(passport.session())

// defincion de archivos publicos del servidor
app.use(express.static('public'))
// agregador de rutas al server
app.use('/', router)

app.listen(process.env.PORT || 3001, (err) => {
  console.log(process.env.PORT)
  if (err) throw err
  console.log('server runnig  http://localhost:3000/')
})
