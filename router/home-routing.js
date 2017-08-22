const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")

const session = require('express-session')
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req,res)=>{
  res.render("login", {err_msg: null})
})

router.post('/login', (req, res) => {
  db.User.findOne({
    where: {
      username: req.body.username,
    }
  })
  .then(data => {
    // if (encrypt(data.secret, req.body.password) == data.password) {
    //   req.session.username = data.username
    //   req.session.role = data.role
    //   res.redirect('/')
    // }
    if (req.body.password == data.password) {
      req.session.username = data.username
      req.session.role = data.role
      req.session.idUser = data.id
      res.redirect(`/${req.session.role}`)
    }
    else {
      res.render('login', {err_msg: 'Password salah.'})
    }
  })
  .catch(err => {
    res.render('login', {err_msg: 'Username tidak ada.'})
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})


module.exports = router
