const mongoose = require('mongoose')

exports.MASDefinition = require('./mas-definitions')(mongoose)
exports.AgentSource = require('./agent-source')(mongoose)