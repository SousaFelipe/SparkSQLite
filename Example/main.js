

const User = require('./app/Models/User')


// Stores a new record in a database table
// User.insert({
//     name: 'Felipe Sousa',
//     email: 'sousa.felipe@outlook.com',
//     password: 'secret'
// })


// // Update user email if field name equals 'Felipe Sousa'
// // You can update one or several fields at once
// User.update(
//     { email: 'fake@email.com' },        // The conditions to update this record
//     { email: 'flpssdocarmo0@gmail.com'} // The new value for one, or many fields that will be updated
// )


// Now we are removing a record by the corresponding email
User.delete(
    { email: 'joyce.maciel2609@gmail.com' } // The conditions to remove one or many records
)


// Selecting the records matching the name "Felipe Sousa"
// You can pass an empty object to get all records
User.select({ name: 'Felipe Sousa' }, users => {
    users.map(user => {
        console.log(user)
    })
})