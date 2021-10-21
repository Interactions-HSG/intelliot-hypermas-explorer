module.exports = function(app) {
  require('./mas')(app)
  require('./environment')(app)
}