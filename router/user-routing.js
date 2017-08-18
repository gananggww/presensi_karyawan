const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req,res)=>{
  db.User.findAll({
    include: db.Karyawan
  })
  .then(dataUsers => {
    res.render('user', {dataUsers: dataUsers})
  })
})

router.get("/register", (req,res)=>{
  db.Karyawan.findAll()
  .then(data_karyawans => {
    res.render('user-register', {data_karyawans: data_karyawans, err_msg: null})
  })
})

router.post('/register', (req, res) => {
  db.User.create({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    KaryawanId: req.body.KaryawanId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/user')
  })
  .catch(err => {
    db.Karyawan.findAll()
    .then(data_karyawans => {
      res.render('user-register', {data_karyawans: data_karyawans, err_msg: err})
    })
  })
})

router.get('/delete/:id', (req, res) => {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/user')
  })
})

router.get("/edit/:id", (req, res)=>{
  db.User.findById(req.params.id)
  .then(data_users => {
    db.Karyawan.findAll()
    .then(data_karyawans => {
      res.render('user-edit', {data_users: data_users, data_karyawans: data_karyawans, err_msg: null})
    })
  })
})

router.post('/edit/:id', (req, res) => {
  db.User.update({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    KaryawanId: req.body.KaryawanId,
    updatedAt: new Date()
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/user')
  })
  .catch(err => {
    db.User.findById(req.params.id)
    .then(data_users => {
      db.Karyawan.findAll()
      .then(data_karyawans => {
        res.render('user-edit', {data_users: data_users, data_karyawans: data_karyawans, err_msg: err})
      })
    })
  })
})




module.exports = router
