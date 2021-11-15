const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: {},
    teamleader: {},



})

module.exports = Team = mongoose.model('team', TeamSchema);