const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config();

module.exports = () => {
    mongoose.connect(
        process.env.DB_CONNECT,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        },
        () => console.log('Connected to db')
    )
    mongoose.set('useCreateIndex', true)
}