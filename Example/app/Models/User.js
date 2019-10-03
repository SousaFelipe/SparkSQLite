

// Get the Model class in the 'spark-sqlite' package
const { Model } = require('spark-sqlite')


// Get the UserSchea
const UserSchema = require('../Schemas/UserSchema')


// Models like that classe, should always extends from the 'Model' superclass
class User extends Model {
    constructor() {
        super(new UserSchema())
    }
}


// To make importing easier, you can instantiate
// your 'Model' at export time
module.exports = new User()
