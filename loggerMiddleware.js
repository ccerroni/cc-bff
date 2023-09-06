const logger = (req, res, next) => {
  console.log('---------REQUEST DATA------------')
  console.log('METHOD: ', req.method)
  console.log('PATH: ', req.path)
  console.log('BODY: ', req.body)
  console.log('---------------------------------')
  next()
}

module.exports = logger
