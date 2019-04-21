'use strict'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')
const db = require('./db')
const clientController = require('./controllers/clients')

router.get('/login', (req, res) => {
  res.type('html')
  res.render('pages/loginClient')
})

router.get('/soyrappi', (req, res) => {
  res.type('html')
  res.render('pages/login-rt')
})
router.get('/formClient', (req, res) => {
  res.type('html')
  res.render('pages/form-client')
})
router.get('/formRT', (req, res) => {
  res.type('html')
  res.render('pages/form-rt')
})
router.get('/', (req, res) => {
  res.render('pages/index-page', { user: req.session.user })
})

// autenticacion de boton
router.get('/login/auth/google',
  passport.authenticate('googleClient', { scope: ['profile', 'email'] }),
  () => {}
)
// calback con informacion de usuario en google
router.get('/login/auth/google/callback',
  passport.authenticate('googleClient', { failureRedirect: '/login' }),
  clientController.login_process
)

router.get('/soyrappi/auth/google', passport.authenticate('googleSoyRappi', {
  scope: ['profile', 'email']
}), () => {
})

router.get('/soyrappi/auth/google/callback',
  passport.authenticate('googleSoyRappi', {
    failureRedirect: '/soyrappi'
  }), async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-rt', {
        user: req.user
      })
    } else {
      await db.deliveryPerson.findByIdGoogleStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
  }
)

// autenticacion de boton de google para usuario
router.get('/login/auth/facebook', passport.authenticate('facebookClient', { scope: ['user_friends', 'manage_pages', 'email'] })
)
router.get('/login/auth/facebook/callback',
  passport.authenticate('facebookClient', {
    failureRedirect: '/login'
  }), async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-client', {
        user: req.user
      })
    } else {
      await db.client.findByIdFacebookStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
  })
// autenticacion de boton de google para usuario
router.get('/soyrappi/auth/facebook', passport.authenticate('facebookRT', {
  scope: ['user_friends', 'manage_pages', 'email']
})
)
router.get('/soyrappi/auth/facebook/callback',
  passport.authenticate('facebookRT', {
    failureRedirect: '/soyrappi'
  }), async (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-rt', {
        user: req.user
      })
    } else {
      await db.deliveryPerson.findByIdFacebookStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
  })
router.get('/admin', (req, res) => {
  res.render('pages/admin')
})
router.post('/admin/home', passport.authenticate('admin', { failureFlash: true }), (req, res) => {
  res.send('hola administrador ' + req.user.user_name)
})
router.post('/login/auth/google/post', async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.client.registerAdressUsingGoogleStrategy(req.user).then()
  await db.client.findByIdGoogleStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})

router.post('/login/auth/facebook/post', async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.client.registerAdressUsingFacebookStrategy(req.user).then()
  await db.client.findByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})
router.post('/soyrappi/auth/google/post', async (req, res) => {
  req.user.personal_id = req.body.personal_id
  req.user.phone_number = req.body.phone_number
  await db.deliveryPerson.registerAdditionalDataUsingGoogleStrategy(req.user).then()
  await db.deliveryPerson.findByIdGoogleStrategy(req.user).then((rappiTendero) => {
    req.session.user = rappiTendero
  })
  res.redirect('/')
})
router.post('/soyrappi/auth/facebook/post', async (req, res) => {
  req.user.personal_id = req.body.personal_id
  req.user.phone_number = req.body.phone_number
  await db.deliveryPerson.registerAdditionalDataUsingFacebookStrategy(req.user).then()
  await db.deliveryPerson.findByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})

module.exports = router
