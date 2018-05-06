// const MongoClient = require("mongodb").MongoClient
const { MongoClient, ObjectID } = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongo db derver')
    }
    console.log('Connected to mongodb server')

    const db = client.db('TodoApp')

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log("Unable to insert record", err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))

    // })

    // db.collection('Users').insertOne({
    //     name: 'Chris',
    //     age: 35,
    //     location: 'Long Beach, CA'
    // }, (err, results) => {
    //     if (err) {
    //         return console.log('Unable to insert record', err);
    //     }
    //     console.log(results.ops[0]._id.getTimestamp());

    // })
    // client.close()
})

