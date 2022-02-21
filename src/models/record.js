const mongoose = require('mongoose')
const recordSchema = new mongoose.Schema({});
const recordModel = mongoose.model('recordModel', recordSchema, 'records');
module.exports = recordModel;