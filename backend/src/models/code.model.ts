const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema({
    code:String
});

export const CodeModel = mongoose.model('code', CodeSchema);


