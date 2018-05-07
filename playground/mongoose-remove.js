const { ObjectID } = require('mongodb')
const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/model/todo')
const { User } = require('./../server/model/user')

// Todo.remove({}).then((result) => {
//     console.log(result);
// })

Todo.findOneAndRemove()

Todo.findByIdAndRemove('5aefe1ba8273253de9fa7750').then((todo) => {
    console.log(todo);
})