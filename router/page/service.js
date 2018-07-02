var dao = require('./dao')
var userDao = require('../user/dao')

module.exports = {
  async getPageList () {
    var res = await dao.getPageList()
    return res
  },
  async getPage (pid) {
    var res = await dao.getPage(pid)
    return res
  },
  async deletePage (pid) {
    var res = await dao.deletePage(pid)
    return res
  },
  async setPage (params, token) {
    var target = await dao.getPage(params.pid)
    var res = false
    if (!target) {
      var user = await userDao.getUserByToken(token)
      params.uid = user.uid
      res = await dao.addPage(params)
    } else {
      res = await dao.editPage(params)
    }
    return res
  }
}
