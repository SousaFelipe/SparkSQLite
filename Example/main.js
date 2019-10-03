const User = require('./app/Models/User')


User.insert({
    name: 'Felipe Sousa',
    email: 'sousa.felipe@outlook.com',
    password: 'secret'
})


logUsers()


User.update({ name: 'Felipe Sousa' }, { email: 'mail.fake.@gmail.com' })


logUsers()


User.delete({ email: 'sousa.felipe@outlook.com' })


logUsers()


function logUsers() {

    User.select({}, users => {
        users.map(user => {
            console.log(`${ user.name }, ${ user.email }`)
        })
    })

}
