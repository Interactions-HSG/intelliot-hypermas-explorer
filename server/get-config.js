var args = process.argv.slice(2);
var configPath = args[0]
var config = require(configPath)

module.exports.getConfig = function(){
  return config;
}