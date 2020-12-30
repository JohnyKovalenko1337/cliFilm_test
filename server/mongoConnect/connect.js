const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

module.exports = function zxc() {
    mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        () => console.log('Connected to db')
    )
}