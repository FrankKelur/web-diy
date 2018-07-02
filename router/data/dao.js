const Utils = require('../Utils')

module.exports = {
  getDataList (pid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').find({pid}).toArray((err, rows) => {
          db.close()
          if (err) throw err
          resolve(rows)
        })
      }).catch(err => {
        console.error('dao', err)
        resolve([])
      })
    })
  },
  deleteData (rid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').deleteOne({rid}, (err) => {
          db.close()
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  getDataDetail (rid) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').find({rid}).limit(1).toArray((err, rows) => {
          db.close()
          if (err) throw err
          resolve(rows[0])
        })
      })
    })
  },
  addData (row) {
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').insertOne(row, (err) => {
          db.close()
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  editData (row) {
    delete row['_id']
    return new Promise(resolve => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('data').updateOne({rid: row.rid}, {$set: row}, (err) => {
          db.close()
          if (err) throw err
          resolve(true)
        })
      })
    })
  }
}
