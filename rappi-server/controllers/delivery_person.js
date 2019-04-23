'use strict'
const db = require('../db')

exports.authenticateByGoogleStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.deliveryPerson.findByIdGoogleStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.deliveryPerson.createUsingGoogleStrategy(profile).then((id) => {
        req.session.newuser = true
        return done(null, profile)
      })
    }
  })
}

exports.authenticateByFacebookStrategy = (req, accessToken, refreshToken, profile, done) => {
  db.deliveryPerson.findByIdFacebookStrategy(profile).then((id) => {
    if (id) {
      req.session.newuser = false
      return done(null, profile)
    } else {
      db.deliveryPerson.createUsingFacebookStrategy(profile).then((id) => {
        req.session.newuser = true
        return done(null, profile)
      })
    }
  })
}

exports.loginRedirectGoogleStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-rt', { user: req.user })
  } else {
    await db.deliveryPerson.findByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}

exports.loginRedirectFacebookStrategy = async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-rt', { user: req.user })
  } else {
    await db.deliveryPerson.findByIdFacebookStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
}

exports.setAdditionalDataGoogleStrategy = async (req, res) => {
  req.user.personal_id = req.body.personal_id
  req.user.phone_number = req.body.phone_number
  await db.deliveryPerson.registerAdditionalDataUsingGoogleStrategy(req.user).then()
  await db.deliveryPerson.findByIdGoogleStrategy(req.user).then((rappiTendero) => {
    req.session.user = rappiTendero
  })
  res.redirect('/')
}

exports.setAdditionalDataFacebookStrategy = async (req, res) => {
  req.user.personal_id = req.body.personal_id
  req.user.phone_number = req.body.phone_number
  await db.deliveryPerson.registerAdditionalDataUsingFacebookStrategy(req.user).then()
  await db.deliveryPerson.findByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
}
