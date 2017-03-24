const randtoken  = require('rand-token')
const mysql      = require('mysql')
const sha1       = require('sha1')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'airhost',
})

// SIGNIN
// =============================================================================
const signin = (req, res) => {
  const password = sha1(req.query.password) || res.send({'error': 'Wrong password'})
  connection.query('SELECT * FROM users WHERE `email` = ?', [req.query.email], (err, rows, fields) => {
    if (!err) {
      if (rows[0] && rows[0].password === password) {
        console.log(`${req.query.email} has logged in!`)
        res.send(rows[0])
      }
      else {
        res.send({'error': 'Wrong password'})
        console.log('Error while performing Query: Wrong password')
      }
    } else {
      res.send({'error': 'Email does not exist'})
      console.log('Error while performing Query: Email does not exist', err)
    }
  })
}

// REGISTER
// =============================================================================
const register = (req, res) => {

  console.log('Registering...')
  console.log(req.body.params)
  const body = req.body.params
  const date_registering = new Date()
  const token_session = randtoken.generate(16)
  const password = sha1(body.password)


  const params = {
    'email':          body.email,
    'password':       password,
    'token_session':  token_session,
    'subscription':   date_registering,
    'token_airbnb':   '',
    'ip':             body.ip,
  }

  connection.query('INSERT INTO users SET ?', params, (err, rows) => {
    if (!err) {
      console.log(`${params.email} has successfully subscribed!`)
      res.send(params)
    } 
    else {
      console.log('Error when registering', err)
      res.send({'error': 'Error'})
    }
  })
}

module.exports = {
  signin,
  register,
}
