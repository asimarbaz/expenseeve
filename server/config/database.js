const mongoose = require('mongoose')

const configureDb = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/march_2023')
        .then(() => {
            console.log('connected to db')
        })
        .catch((err) => {
            console.log('error connecting to db', err)
        })
}

module.exports = configureDb