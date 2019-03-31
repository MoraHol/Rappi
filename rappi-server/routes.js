'use strcit'
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/login', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/loginClient.html`))
})

module.exports = router