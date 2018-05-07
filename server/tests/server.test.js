const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('./../server')
const { Todo } = require('./../model/todo')

const todos = [{
    text: 'First test todo',
    _id: new ObjectID()
}, {
    text: 'Second test todo',
    completed: true,
    _id: new ObjectID()
}]

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos)
    }).then(() => done())
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text)
            })
            .end((err, res) => {
                if (err) {
                    return done(error)
                }
                Todo.find({ text }).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))
            })

    })

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({ text: "" })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(error)
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2)
                    done()
                }).catch((e) => done(e))
            })
    })
})

describe('Get /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2)
            })
            .end(done)
    })
})

describe('Get /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    })

    it('should return a 404 if todo not found', (done) => {
        request(app)
            .get(`/todos/${new ObjectID().toHexString()}`)
            .expect(404)
            .end(done)
    })

    it('should return a 404 for non-object ids', (done) => {
        request(app)
            .get(`/todos/1234`)
            .expect(404)
            .end(done)
    })
})

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString()

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId)
            })
            .end((err, res) => {
                if (err) {
                    return done(err)
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).toNotExist()
                    done()
                }).catch((err) => done(err))
            })
    })

    it('should return 404 if todo not found', (done) => {
        var hexId = new ObjectID().toHexString()

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    })

    it('should return 404 if object id is invalid', (done) => {
        request(app)
            .delete(`/todos/asdfagadsg`)
            .expect(404)
            .end(done)
    })
})

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        request(app)
            .patch(`/todos/${todos[0]._id.toHexString()}`)
            .send({
                completed: true,
                text: "New text"
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe("New text")
                expect(res.body.todo.completed).toBeTruthy()
                expect(res.body.todo.completedAt).toBeA('number')
            })
            .end(done)
    })

    it('should clear completedAt when todo is not completed', (done) => {
        request(app)
            .patch(`/todos/${todos[1]._id.toHexString()}`)
            .send({
                completed: false
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.completedAt).toNotExist()
            })
            .end(done)
    })
})