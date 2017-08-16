const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req,res)=>{
  res.send("ini karyawan")
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
