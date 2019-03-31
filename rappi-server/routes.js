'use strcit'
const express = require('express')
const path = require('path')
const router = express.Router()

router.get('/login', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/loginClient.html`))
})
router.get('/soyrappi', (req, res) => {
  res.type('html')
  res.sendFile(path.resolve(`${__dirname}/public/loginRT.html`))
})
router.get('/', (req, res) => {
  res.send('')
})
module.exports = router
