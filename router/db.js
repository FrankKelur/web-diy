// var Utils = require('./Utils')

// Utils.connect().then(({db, dbo}) => {
//   dbo.collection('user').find().toArray((err, rows) => {
//     console.log('col', rows)
//     db.close()
//   })
// })
// // drop 所有的表
// Utils.connect().then(({db, dbo}) => {
//   dbo.listCollections((err, cols) => {
//     console.log('col', cols, err)
//     for (var col of cols) {
//       dbo.collection(col.name).drop()
//     }
//   })
// })
//
// // 创建user表
// Utils.connect().then(({db, dbo}) => {
//   dbo.createCollection('user', () => {
//     dbo.collection('user').insertOne(
//       {uid: 'admin', password: 'admin', token: ''})
//   })
// })
//
// // 创建config表
// Utils.connect().then(({db, dbo}) => {
//   dbo.createCollection('config', () => {
//   })
// })
//
// // 创建page表
// Utils.connect().then(({db, dbo}) => {
//   dbo.createCollection('page', () => {
//   })
// })
//
// // 创建data表
// Utils.connect().then(({db, dbo}) => {
//   dbo.createCollection('data', () => {
//     // dbo.collection('data').insertOne({rid: '0', pid: 'test', data: ''})
//   })
// })
