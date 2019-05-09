exports.checkIfValidPerson = async (req, res) => {
  if (req.session.user) {
    if (req.session.user.is_valid_for_work === false) 
    {
      res.render('pages/rt-landing', { user: req.session.user })
    }
    else
    {
      res.render('pages/login-rt', { message: 'Usted no esta habilitado para trabajar, por favor acerquese a una de nuestras oficinas a validar sus datos' })
    }
    
  } else {
    res.render('pages/login-rt', { message: 'Por favor inicie sesión' })
  }

}