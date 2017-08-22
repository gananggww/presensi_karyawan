const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")
const konversiTanggal = require("../helpers/konversiTanggal")
const konversiBulan = require("../helpers/konversiBulan")

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())


router.get("/", (req,res)=>{
  res.send("ini absensi")
})

router.get('/absen', (req, res) => {
  res.render('tes2')
})

router.post('/absen', (req,res) => {

  var datang = new Date().getHours()
  if (datang <= 9) {   // kalau datang sebelum jam 9:01
    var rule = 1  // pelanggaran bersih
  } else {
    var rule = 2  // terlambat
  }

  db.Absensi.create({
    tanggal: konversiTanggal(new Date()),
    bulan: konversiBulan(new Date()),
    jam_datang: datang,
    KaryawanId: req.body.KaryawanId,
    RuleId: rule,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/absensi')
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/absenpulang', (req,res) => {

  db.Absensi.findOne({
    where: {
      KaryawanId: req.body.KaryawanIdPulang,
      tanggal: konversiTanggal(new Date())
    }
  })
  .then(data => {

    if (data.jam_datang <= 9 && req.body.jam_pulang > 17) {
      var rule = 1
    } else if (req.body.jam_pulang > 17) {
      var rule = 2
    } else if (data.jam_pulang <= 9) {
      var rule = 3
    } else {
      var rule = 4
    }

    db.Absensi.update({
      jam_pulang: new Date().getHours(),
      RuleId: rule,
      updatedAt: new Date()
    }, {
      where: {
        KaryawanId: req.body.KaryawanIdPulang,
        tanggal: konversiTanggal(new Date())
      }
    })
    .then(() => {
      res.redirect('/absensi')
    })
    .catch(err => {
      res.send(err)
    })
  })


})

module.exports = router
