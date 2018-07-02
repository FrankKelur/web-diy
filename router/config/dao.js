const Utils = require('../Utils')

module.exports = {
  getConfig (uid) {
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('config').find({uid}).limit(1).toArray((err, rows) => {
          db.close()
          if (err) throw err
          resolve(rows[0])
        })
      })
    })
  },
  editConfig (uid, row) {
    return new Promise((resolve) => {
      delete row['_id']
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('config').updateOne({uid}, {$set: row}, err => {
          db.close()
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  addConfig (row) {
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('config').insertOne(row, err => {
          db.close()
          if (err) throw err
          console.log('config insert success !!!')
          resolve(true)
        })
      })
    })
  }
}
