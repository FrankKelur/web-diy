var router = require('express').Router()
var service = require('./service')

router.post('/sign-up', function (req, res) {
  var {uid, password} = req.body
  var row = {uid, password}
  service.editUser(row).then(() => {
    res.json({re: 200})
  })
})
router.post('/login', function (req, res) {
  var token = 'token_' + new Date().getTime()
  var {password, uid} = req.body
  var row = {password, uid, token}
  service.getUser(row).then(target => {
    if (target.password === password) {
      service.editUser(row).then(() => {
        res.json({re: 200, token: token})
      })
    } else {
      res.json({re: 401, msg: 'uid, password no match'})
    }
  })

})
router.post('/logout', function (req, res) {
  var {token} = req.cookies
  var row = {token: ''}
  console.log('logout', token, req.cookies)
  service.editUserByToken(token, row).then(() => {
    res.json({re: 200})
  })
})

module.exports = router
