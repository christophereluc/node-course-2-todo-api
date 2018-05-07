const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/model/todo')
const { User } = require('./../server/model/user')
var id = "5aee9a32a042006bcfdc0534"

if (!ObjectID.isValid(id)) {
    return console.log("ID not valid");
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// }).catch((e) => console.log(e))

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     if (!todo) {
//         return console.log('Todo not not found')
//     }
//     console.log('Todos', todo)
// }).catch((e) => console.log(e))

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo by id', todo)
// }).catch((e) => console.log(e))

User.findById(id).then((user) => {
    if (!user) {
        console.log("User not found")
    }
    console.log(JSON.stringify(user, undefined, 2));

}).catch((e) => console.log(e))