const { Schema } = require('spark-sqlite')



class UserSchema extends Schema {
    constructor() {
        super('users', {
            name: {
                type: 'TEXT'
            },
            email: {
                type: 'TEXT'
            },
            password: {
                type: 'TEXT'
            }
        })
    }
}



module.exports = UserSchema
