const { Model } = require('spark-sqlite')
const UserSchema = require('../Schemas/UserSchema')



class User extends Model {
    constructor() {
        super(new UserSchema())
    }
}



module.exports = new User()
