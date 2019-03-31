'use strict'

const express = require('express')
const app = express()
const router = require('./routes')

app.use('/public', express.static('public'))
app.use('/', router)

app.listen(process.env.PORT || 3000, () => {
  console.log('server runnig  http://localhost:3000/')
})
