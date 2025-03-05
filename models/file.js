const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    data: String
});

module.exports = mongoose.model('File', fileSchema);
