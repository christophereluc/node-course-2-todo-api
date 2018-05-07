var express = require('express')
var bodyParser = require('body-parser')

var { mongoose } = require('./db/mongoose')
var { Todo } = require('./model/todo')
var { User } = require('./model/user')
var { ObjectID } = require('mongodb')

var app = express()

const port = process.env.PORT || 3000

app.use(bodyParser.json())

app.post("/todos", (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then((doc) => {
        res.status(200).send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (err) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Not found")
    }

    Todo.findById(id).then((todo) => {
        if (!todo) {
            return res.status(404).send("Not found")
        }
        res.send({ todo })
    }).catch((e) => res.status(400).send())
}, (err) => {
    res.status(400).send(e)
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
        return res.status(404).send("Not found")
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send("Not found")
        }
        res.send({ todo })
    }).catch((e) => res.status(400).send())
})

app.listen(port, () => {
    console.log(`Started on port ${port}`);
})

module.exports = {
    app
}