'use strcit'

const express = require('express')
const router = express.Router()
const passport = require('./passport-config')
const db = require('./db/api')

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
    await db.findUserByIdGoogleStrategy(req.user).then((row) => {
      req.session.user = row
    })
    res.redirect('/')
  }
})

router.get('/soyrappi/auth/google', passport.authenticate('googleSoyRappi', {
  scope: ['profile']
}), () => {
})

router.get('/soyrappi/auth/google/callback',
  passport.authenticate('googleSoyRappi', {
    failureRedirect: '/soyrappi'
  }), (req, res) => {
    res.render('pages/form-rt', {
      user: req.user
    })
  })

// autenticacion de boton de google para usuario
router.get('/login/auth/facebook', passport.authenticate('facebookClient', { scope: ['user_friends', 'manage_pages'] })
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
      await db.findUserByIdFacebookStrategy(req.user).then((row) => {
        req.session.user = row
      })
      res.redirect('/')
    }
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
router.post('/login/auth/google/post', async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.registerAdressGoogleStrategy(req.user).then()
  await db.findUserByIdGoogleStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})

router.post('/login/auth/facebook/post', async (req, res) => {
  req.user.address = req.body.address
  req.user.address_details = req.body.address_details
  await db.registerAdressFacebookStrategy(req.user).then()
  await db.findUserByIdFacebookStrategy(req.user).then((user) => {
    req.session.user = user
  })
  res.redirect('/')
})

module.exports = router
