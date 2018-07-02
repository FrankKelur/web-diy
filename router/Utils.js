const MongoClient = require('mongodb').MongoClient

var uri = 'mongodb://frank:GdvceR9k02mz6Mim@cluster0-shard-00-00-iew37.mongodb.net:27017,cluster0-shard-00-01-iew37.mongodb.net:27017' +
  ',cluster0-shard-00-02-iew37.mongodb.net:27017/web-diy?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin'
const dbName = 'web-diy'

module.exports = {
  connect () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(uri, (err, db) => {
        if (err) {
          reject(err)
        }
        var dbo = db.db(dbName)
        resolve({db, dbo})
      })
    })
  }
}
