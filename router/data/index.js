var router = require('express').Router()
var service = require('./service')

router.post('/list', function (req, res) {
  console.log('data/list', req.body, req.url)
  var {dataNum: num, dataSize: size, searchData: query} = req.body
  service.getDataList(query.pid, query).then(data => {
    res.json({
      total_num: data.length,
      detail: data.slice(num * (size - 1), size)
    })
  })
})
router.post('/delete', function (req, res) {
  var row = req.body
  service.deleteData(row).then(() => {
    res.json({re: 200})
  })
})
router.post('/customOperate', function (req, res) {
  var row = req.body
  console.log('customOperate row', row)
  res.json({re: 200})
})
router.post('/detail', function (req, res) {
  var row = req.body
  service.getDataDetail(row).then(target => {
    res.json({data: target || {}})
  })
})
router.post('/edit', function (req, res) {
  var params = req.body
  service.editData(params).then(() => {
    res.json({re: 200})
  })
})

module.exports = router
