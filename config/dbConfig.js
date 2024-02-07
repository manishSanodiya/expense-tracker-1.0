const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    HOST: 'localhost',
    USER:'root',
    PASSWORD:process.env.PASSWORD,
    DB:'expense-tracker',
    dialect:'mysql'

}