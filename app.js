const express = require('express')
const app = express()
app.set("view engine", "ejs")
const home = require("./router/home-routing")
// const login = require("../router/login-routing")

const session = require('express-session')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))


const staff = require("./router/staff-routing")
const user = require("./router/user-routing")
const absensi = require("./router/absensi-routing")
const rules = require("./router/rules-routing")
const jabatan = require("./router/jabatan-routing")
const stat = require("./router/stat-routing")


app.use("/", home)
app.use("/jabatan", jabatan )
app.use("/staff", staff)
app.use("/absensi", absensi)
app.use("/rules", rules)
app.use("/user", user)
app.use("/stat", stat)



app.listen(process.anv.PORT||3000, ()=> {
  console.log('Example app listening on port 3000!')
})
