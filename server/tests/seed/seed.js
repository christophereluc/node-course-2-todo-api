const { ObjectID } = require('mongodb')
const { Todo } = require('./../../model/todo')
const { User } = require('./../../model/user')
const jwt = require('jsonwebtoken'
)
const userOneId = new ObjectID()
const userTwoId = new ObjectID()

const users = [{
    _id: userOneId,
    email: 'christopher.luc@gmail.com',
    password: 'useronepass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]
}, {
    _id: userTwoId,
    email: 'chrisluc@gmail.com',
    password: 'usertwopass'
}]


const todos = [{
    text: 'First test todo',
    _id: new ObjectID()
}, {
    text: 'Second test todo',
    completed: true,
    _id: new ObjectID()
}]

const populateTodos = (done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        var userOne = new User(users[0]).save()
        var userTwo = new User(users[1]).save()

        return Promise.all([userOne, userTwo])
    }).then(() => done())
}

module.exports = {
    todos, populateTodos, populateUsers, users
}