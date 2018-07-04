var router = require('express').Router()
var service = require('./service')

router.post('/edit', function (req, res) {
  var params = req.body
  var {token} = req.cookies
  console.log('edit token:', token)
  service.setConfig(token, params).then(() => {
    res.json({re: 200})
  })
})

router.post('/detail', function (req, res) {
  var {token} = req.cookies
  service.getConfig(token).then(data => {
    res.json({re: 200, data: data})
  })
})

module.exports = router
