var router = require('express').Router()
var service = require('./service')

router.post('/list', function (req, res) {
  service.getPageList().then(pages => {
    res.json({re: 200, data: pages})
  })
})
router.post('/detail', function (req, res) {
  var {pid} = req.body
  service.getPage(pid).then(page => {
    res.json({re: '200', data: page})
  })
})
router.post('/delete', function (req, res) {
  var {pid} = req.body
  service.deletePage(pid).then(() => {
    res.json({re: '200'})
  })
})
router.post('/edit', function (req, res) {
  var params = req.body
  var {token} = req.cookies
  service.setPage(params, token).then(() => {
    res.json({re: '200'})
  })
})

module.exports = router
