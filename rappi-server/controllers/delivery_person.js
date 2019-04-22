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
