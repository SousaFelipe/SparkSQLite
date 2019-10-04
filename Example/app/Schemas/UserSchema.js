

// Get the "Schema" class in 'spark-sqlite" package
const { Schema } = require('spark-sqlite')


// A class like that, should always extends from the "Schema" superclass
class UserSchema extends Schema {
    // Should always have a constructor
    constructor() {
        // Should always call "super", passing the table name
        // and an object containing the table properties
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


// Exporting the "UserSchema"
module.exports = UserSchema
