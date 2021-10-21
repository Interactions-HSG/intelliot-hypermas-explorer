const mongoose = require('mongoose')

exports.MASDefinitions = require('./mas-definitions')(mongoose)
exports.AgentDefinitions = require('./agent-definitions')(mongoose)