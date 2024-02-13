const mongoose = require('mongoose');

const gmailSchema = new mongoose.Schema({
    _gmail: {
        type: String,
        require
    },
    get gmail() {
        return this._gmail;
    },
    set gmail(value) {
        this._gmail = value;
    },
}); 

const gmail = mongoose.Schema("gmail",gmailSchema)
module.exports = gmail;