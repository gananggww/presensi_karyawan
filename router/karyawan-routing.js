const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get('/', (req, res) => {
  db.Karyawan.findAll({
    include: db.Jabatan,
    order: ['nama']
  })
  .then(data_karyawans => {
    res.render('karyawan', {data_karyawans: data_karyawans})
  })
})

router.get('/add', (req, res) => {
  db.Jabatan.findAll()
  .then(data_jabatans => {
    res.render('karyawan-add', {data_jabatans: data_jabatans, err_msg: null})
  })
})

router.post('/add', (req, res) => {
  db.Karyawan.create({
    nama: req.body.nama,
    email: req.body.email,
    tlp: req.body.tlp,
    JabatanId: req.body.JabatanId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/karyawan')
  })
  .catch(err => {
    db.Jabatan.findAll()
    .then(data_jabatans => {
      res.render('karyawan-add', {data_jabatans: data_jabatans, err_msg: err})
    })
  })
})

router.get('/delete/:id', (req, res) => {
  db.Karyawan.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/karyawan')
  })
})

router.get('/edit/:id', (req, res) => {
  db.Karyawan.findAll({
    where: {
      id: req.params.id
    },
    include: db.Jabatan
  })
  .then(data_karyawans => {
    res.render('karyawan-edit', {data_karyawans: data_karyawans, err_msg: null})
  })
})

router.post('/edit/:id', (req, res) => {
  db.Karyawan.update({
    nama: req.body.nama,
    email: req.body.email,
    tlp: req.body.tlp,
    JabatanId: req.body.JabatanId,
    updatedAt: new Date()
  }, {
    where: {
      id: req.params.id
    }
  })
  .then(() => {
    res.redirect('/karyawan')
  })
  .catch(err => {
    db.Karyawan.findAll({
      where: {
        id: req.params.id
      },
      include: db.Jabatan
    })
    .then(data_karyawans => {
      res.render('karyawan-edit', {data_karyawans: data_karyawans, err_msg: err})
    })
  })
})


module.exports = router
