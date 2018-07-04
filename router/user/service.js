const dao = require('./dao')

module.exports = {
  async editUser (row) {
    var target = await dao.getUser(row.uid)
    var res = false
    console.log('target', target)
    if (target) {
      console.log('edit user true')
      res = await dao.editUser(row)
    } else {
      res = await dao.addUser(row)
    }
    return res
  },
  async getUser(row) {
    var res = await dao.getUser(row.uid)
    console.log('service getUser', res, row.uid)
    return res || {}
  },
  async getUserByToken(row) {
    var res = await dao.getUserByToken(row.token)
    return res || {}
  },
  async editUserByToken (token, row) {
    var res = await dao.editUserByToken(token, row)
    return res
  }
}
