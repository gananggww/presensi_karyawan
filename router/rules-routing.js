const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const db = require("../models")


router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get("/", (req,res)=>{
  res.send("ini routing")
})

module.exports = router
