

const bodyParser = require('body-parser')

const pessoas = require('./pessoaRoutes.js')

module.exports = app => {
  app.use(
    bodyParser.json(),
    pessoas,
  )
 }