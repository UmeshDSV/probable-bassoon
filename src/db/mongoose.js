const mongoose = require('mongoose')
require('dotenv').config()
const uri = process.env.MONGO_DB_URI || "mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true"
mongoose.connect(uri, {
    useNewUrlParser: true
})