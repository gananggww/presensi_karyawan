const express = require('express')
const app = express()
app.set("view engine", "ejs")
const home = require("./router/home-routing")
// const login = require("../router/login-routing")
const karyawan = require("./router/karyawan-routing")
const user = require("./router/user-routing")
const absensi = require("./router/absensi-routing")
const rules = require("./router/rules-routing")

app.use("/", home)
app.use("/karyawan", karyawan)
app.use("/absensi", absensi)
app.use("/rules", rules)
app.use("/user", user)



app.listen(3000, ()=> {
  console.log('Example app listening on port 3000!')
})
