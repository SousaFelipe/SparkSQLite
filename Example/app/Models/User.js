

// Get the Model class in the "spark-sqlite" package
const { Model } = require('spark-sqlite')


// Get the "UserSchema"
const UserSchema = require('../Schemas/UserSchema')


// A class like that, should always extends from the "Model" superclass
class User extends Model {
    constructor() {
        super(new UserSchema())
    }
}


// To make importing easier, you can instantiate
// your "Model" at export time
module.exports = new User()
