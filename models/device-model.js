const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    current:{
        type: String,
        default: "0",
    },
    voltage:{
        type: String,
        default: "0",
    },
    resistance:{
        type: String,
        default: "0",
    },
    earthResistance:{
        type: String,
        default: "0",
    },
    latitude: {
        type: String,
        default: "lat",
    },
    longitude: {
        type: String,
        default: "long",
    },
    poleId:{
        type: String,
        default: "id",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
})

const Device = mongoose.model('device', deviceSchema);

module.exports = Device;