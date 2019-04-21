'use strict'
const db = require('../db')

exports.login_process = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.client.findByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}
