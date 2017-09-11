'use strict'

const express      = require('express')
const fs           = require('fs')
const bodyParser   = require('body-parser')
const https        = require('https')
const http         = require('http')
const staticServe  = require('serve-static')
const request      = require('request')

const app          = express()

if (process.env.NODE_ENV === 'prod') {
  app.use(staticServe('/var/www/airhostly', { 'index': ['index.html', 'index.html'] }))

  const key = fs.readFileSync('/etc/letsencrypt/live/airhostly.co-0001/privkey.pem', 'utf8')
  const cert = fs.readFileSync('/etc/letsencrypt/live/airhostly.co-0001/fullchain.pem', 'utf8')
  const ca = fs.readFileSync('/etc/letsencrypt/live/airhostly.co-0001/fullchain.pem', 'utf8')

  const credentials = {
    ca,
    key,
    cert,
  }
}

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8787

const router = express.Router()

const authCtrl = require('./controllers/authCtrl.js')

app.use(staticServe('_domain', {'index': ['index.html', 'index.html'] }))

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  next()
})

// AUTHENTICATION
router.route('/signin').get(authCtrl.signin)
router.route('/register').post(authCtrl.register)

app.use('/api', router)

if (process.env.NODE_ENV === 'prod') {
  http.createServer(app).listen(8000)
  https.createServer(credentials, app).listen(8443)
} else { http.createServer(app).listen(port) }

console.log(new Date() + ' | ' + 'ON PORT ' + port)
