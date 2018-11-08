var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var router = require('./router')
var userService = require('./router/user/service')
var app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/', express.static('dist', {
  maxAge: 60 * 1000 * 1000,
  etag: false
}))

app.use('/static', express.static('static', {
  maxAge: 60 * 1000 * 1000,
  etag: false
}))
var authWhiteList = ['/user/login','/user/sign-up']
var allowCrossDomain = function(req, res, next) {
  console.log('req.origin', req.headers.origin)
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
// app.use('/api', function (req, res, next) {
//   var {token} = req.cookies
//   console.log('req.url, token', req.url)
//   if (authWhiteList.includes(req.url)) {
//     next()
//   } else {
//     userService.getUserByToken({token}).then(user => {
//       console.log('getUserByToken user', user)
//       if (user.uid) {
//         next()
//       } else {
//         res.sendStatus(401)
//       }
//     })
//   }
// })
app.use('/api', router)



var server = app.listen(3000, function () {
  var {host, port} = server.address()
  console.log('host, port', host, port)
})
