'use strcit'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')

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
  res.render('pages/index-page')
})

// autenticacion de boton
router.get('/login/auth/google', passport.authenticate('googleClient', {
  scope: ['profile','email']
}), () => {})
// calback con informacion de usuario en google
router.get('/login/auth/google/callback',  passport.authenticate('googleClient', {
    failureRedirect: '/login'
  }), (req, res) => {
    if (req.session.newuser) {
      res.render('pages/form-client', {user: req.user})
    } else {
      res.render('pages/index-page', {user: req.user})
    }
  })

  router.get('/soyrappi/auth/google', passport.authenticate('googleSoyRappi', {
    scope: ['profile']
  }), () => {})
  
  router.get('/soyrappi/auth/google/callback',
    passport.authenticate('googleSoyRappi', {
      failureRedirect: '/soyrappi'
    }), (req, res) => {
      res.render('pages/form-rt', {
        user: req.user
      })
    })
  
  // autenticacion de boton de google para usuario
router.get('/login/auth/facebook', passport.authenticate('facebookClient', {scope: ['user_friends', 'manage_pages']})
)
router.get('/login/auth/facebook/callback',
  passport.authenticate('facebookClient', {
    failureRedirect: '/login'
  }), (req, res) => {
    res.render('pages/form-client', {
      user: req.user
      })
  })
// autenticacion de boton de google para usuario
router.get('/soyrappi/auth/facebook', passport.authenticate('facebookRT', {
  scope: ['user_friends', 'manage_pages']
})
)
router.get('/soyrappi/auth/facebook/callback',
  passport.authenticate('facebookRT', {
    failureRedirect: '/soyrappi'
  }), (req, res) => {
    // res.json(req.user)
    res.render('pages/form-rt', {
      user: req.user
    })
  })
router.get('/admin', (req, res) => {
  res.render('pages/admin')
})
router.post('/admin/home', (req, res, next) => {
  const user = {
    username: req.body.username,
    password: req.body.password
  }
  res.json(user)
  next(req)
})

module.exports = router
