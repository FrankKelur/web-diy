const Utils = require('../Utils')

module.exports = {
  getPage (pid) {
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('page').find({pid}).limit(1).toArray((err, rows) => {
          db.close()
          if (err) throw err
          resolve(rows[0])
        })
      })
    })
  },
  editPage (page) {
    delete page['_id']
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('page').updateOne({pid: page.pid}, {$set: page}, err => {
          db.close()
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  deletePage (pid) {
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('page').remove({pid: pid}, {justOne: true}, err => {
          db.close()
          if (err) throw err
          resolve(true)
        })
      })
    })
  },
  addPage (page) {
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('page').insertOne(page, err => {
          db.close()
          if (err) throw err
          console.log('page insert success !!!')
          resolve(true)
        })
      })
    })
  },
  getPageList () {
    return new Promise((resolve) => {
      Utils.connect().then(({db, dbo}) => {
        dbo.collection('page').find().toArray((err, rows) => {
          db.close()
          if (err) throw err
          resolve(rows)
        })
      })
    })
  }
}
