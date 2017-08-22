const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req,res)=>{
  db.Karyawan.findAll({
    order: ['nama'],
    include: db.Jabatan
  })
  .then(data_karyawans => {
    res.render('stat', {data_karyawans: data_karyawans, err_msg: null})
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
        res.render('stat_rekap', {data_rekaps: data_rekaps, data_jabatans: data_jabatans})
      })
    }
    else {
      db.Karyawan.findAll({
        order: ['nama'],
        include: db.Jabatan
      })
      .then(data_karyawans => {
        res.render('stat', {data_karyawans: data_karyawans, err_msg: 'Rekap bulan tersebut tidak belum ada'})
      })
    }
  })
})

module.exports = router
