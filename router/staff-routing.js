const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")
const konversiTanggal = require('../helpers/konversiTanggal')
const konversiBulan = require('../helpers/konversiBulan')


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.use((req,res,next) => {
  if (req.session.role == 'staff') {
    next()
  }
  else {
    // res.sendStatus(401)
    res.render('login', {session: req.session, err_msg: 'Anda tidak punya akses ke halaman tersebut, silahkan login.'})
  }
})


router.get('/', (req, res) => {
  db.Absensi.findOne({
    where: {
      KaryawanId: req.session.idUser,
      tanggal: konversiTanggal(new Date)
    }
  })
  .then(data => {
    console.log(data);
    res.render('staff/home', {session: req.session, data: data})
  })
})

router.post('/checkin', (req,res) => {

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
    KaryawanId: req.session.idUser,
    RuleId: rule,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(() => {
    res.redirect('/staff')
  })
  .catch(err => {
    res.send(err)
  })
})

router.post('/checkout', (req,res) => {

  var pulang = new Date().getHours()

  db.Absensi.findOne({
    where: {
      KaryawanId: req.session.idUser,
      tanggal: konversiTanggal(new Date())
    }
  })
  .then(data => {

    if (data.jam_datang <= 9 && pulang > 17) {
      var rule = 1
    } else if (pulang > 17 && data.jam_datang > 8 && data.jam_datang < 12) {
      var rule = 2
    } else if (pulang < 17 && pulang > 12 && data.jam_datang <= 9) {
      var rule = 3
    } else {
      var rule = 4
    }

    db.Absensi.update({
      jam_pulang: pulang,
      RuleId: rule,
      updatedAt: new Date()
    }, {
      where: {
        KaryawanId: req.session.idUser,
        tanggal: konversiTanggal(new Date())
      }
    })
    .then(() => {
      res.redirect('/staff')
    })
    .catch(err => {
      res.send(err)
    })
  })
})

router.get("/rekap", (req,res)=>{
  db.Karyawan.findAll({
    order: ['nama'],
    include: db.Jabatan,
    where: {
      id: req.session.idUser
    }
  })
  .then(data_karyawans => {
    res.render('staff/staff-rekap', {data_karyawans: data_karyawans, err_msg: null})
  })
})

router.get("/rekap/:KaryawanId/:bulan", (req,res)=>{
  db.Absensi.findAll({
    where: {
      KaryawanId: req.params.KaryawanId,
      bulan: req.params.bulan
    },
    order: ['createdAt'],
    include: {
      all: true
    }
  })
  .then(data_rekaps => {
    if (data_rekaps.length != 0) {
      db.Jabatan.findOne({
        where: {
          id: data_rekaps[0].Karyawan.JabatanId
        }
      })
      .then(data_jabatans => {
        res.render('staff/staff-detail', {data_rekaps: data_rekaps, data_jabatans: data_jabatans})
      })
    }
    else {
      db.Karyawan.findAll({
        order: ['nama'],
        include: db.Jabatan,
        where: {
          id: req.session.idUser
        }
      })
      .then(data_karyawans => {
        res.render('staff/staff-rekap', {data_karyawans: data_karyawans, err_msg: 'Rekap bulan tersebut kosong.'})
      })
    }
  })
})


module.exports = router
