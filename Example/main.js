

const User = require('./app/Models/User')


// Stores a new record in a database table
User.insert({
    name: 'Felipe Sousa',
    email: 'sousa.felipe@outlook.com',
    password: 'secret'
})


logUsers()


// Update user email if field name equals 'Felipe Sousa'
// You can update one, many or all fields
User.update(
    { name: 'Felipe Sousa' },           // The conditions to update this record
    { email: 'mail.fake.@gmail.com'}    // The new value for one, many, or all fields that will be updated
)


logUsers()


// Now we are removing a record by the corresponding email
User.delete({ email: 'sousa.felipe@outlook.com' })


logUsers()


function logUsers() {

    // Select one, many or all records from a database table
    // Here, passing an empty object as a condition, we are,
    // trying to get all the records at once
    User.select({}, users => {
        users.map(user => {
            console.log(`${ user.name }, ${ user.email }`)
        })
    })

}
