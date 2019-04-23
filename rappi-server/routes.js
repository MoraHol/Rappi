'use strict'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')
const db = require('./db')

// definicion de rutas (por ahora de pruba)
// los archivos html pueden ser modificados para un motor de plantillas

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
  console.log(req.session.user)
  res.render('pages/index-page', { user: req.session.user })
})

// autenticacion de boton
router.get('/login/auth/google', passport.authenticate('googleClient', {
  scope: ['profile', 'email']
}), () => {
})
// calback con informacion de usuario en google
router.get('/login/auth/google/callback', passport.authenticate('googleClient', {
  failureRedirect: '/login'
}), async (req, res) => {
  if (req.session.newuser) {
    res.render('pages/form-client', { user: req.user })
  } else {
    await db.user.findUserByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
})

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
      await db.rappiTendero.findRappiTenderoByIdGoogleStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
  })

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
      await db.user.findUserByIdFacebookStrategy(req.user).then((row) => {
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
      await db.rappiTendero.findRappiTenderoByIdFacebookStrategy(req.user).then((row) => {
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
  req.user.latitude = req.body.lat
  req.user.longitude = req.body.lng
  await db.user.registerAdressGoogleStrategy(req.user).then()
  await db.user.findUserByIdGoogleStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})

router.post('/login/auth/facebook/post', async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.user.registerAdressFacebookStrategy(req.user).then()
  await db.user.findUserByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})
router.post('/soyrappi/auth/google/post', async (req, res) => {
  req.user.personal_id = req.body.personal_id
  req.user.phone_number = req.body.phone_number
  await db.rappiTendero.registerAdditionalDataGoogleStrategy(req.user).then()
  await db.rappiTendero.findRappiTenderoByIdGoogleStrategy(req.user).then((rappiTendero) => {
    req.session.user = rappiTendero
  })
  res.redirect('/')
})
router.post('/soyrappi/auth/facebook/post', async (req, res) => {
  req.user.personal_id = req.body.personal_id
  req.user.phone_number = req.body.phone_number
  await db.rappiTendero.registerAdditionalDataFacebookStrategy(req.user).then()
  await db.rappiTendero.findRappiTenderoByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})
router.get('/test', (req, res) => {
  res.render('pages/test')
})

module.exports = router
