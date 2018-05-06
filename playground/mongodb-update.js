// const MongoClient = require("mongodb").MongoClient
const { MongoClient, ObjectID } = require('mongodb')


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
        return console.log('Unable to connect to mongo db derver')
    }
    console.log('Connected to mongodb server')

    const db = client.db('TodoApp')

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5aee74cc8273253de9fa55f5")
    // }, {
    //         $set: {
    //             completed: true
    //         }

    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result)
    //     })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5aee1433950640599c86a575")
    }, {
            $set: {
                name: 'Ray'
            },
            $inc: {
                age: 2
            }

        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result)
        })

    client.close()
})

