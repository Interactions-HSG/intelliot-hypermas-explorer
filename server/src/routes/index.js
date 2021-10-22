module.exports = function(app) {
  require('./definition')(app)
  require('./runtime')(app)
  require('./environment')(app)
}