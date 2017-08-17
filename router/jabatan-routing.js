const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get('/', (req, res) => {
  db.Jabatan.findAll()
  .then(data_jabatans => {
    res.render('jabatan', {data_jabatans: data_jabatans})
  })
})

router.get('/add', (req, res) => {
    res.render('jabatan-add', {err_msg: null})
})

router.post('/add', (req, res) => {
  db.Jabatan.create({
    nama_jabatan: req.body.nama_jabatan,
    gaji: req.body.gaji,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/jabatan')
  })
  .catch(err => {
    res.render("jabatan-add", {err_msg: err})
  })
})

router.get('/delete/:id', (req, res) => {
  db.Jabatan.destroy({
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/jabatan')
  })
})

router.get('/edit/:id', (req, res) => {
  db.Jabatan.findAll({
    where: {id: req.params.id}
  })
  .then(data_jabatans => {
    res.render('jabatan-edit', {data_jabatans: data_jabatans[0], err_msg: null})
  })
})

router.post('/edit/:id', (req, res) => {
  db.Jabatan.update({
    nama_jabatan: req.body.nama_jabatan,
    gaji: req.body.gaji,
    updatedAt: new Date()
  }, {
    where: {id: req.params.id}
  })
  .then(() => {
    res.redirect('/jabatan')
  })
  .catch(err => {
    db.Jabatan.findAll({
      where: {id: req.params.id}
    })
    .then(data_jabatans => {
      res.render('jabatan-edit', {data_jabatans: data_jabatans, err_msg: err})
    })
  })
})


module.exports = router
