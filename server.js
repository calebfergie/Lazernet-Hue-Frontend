const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')

// dotenv baby
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('view engine', 'ejs')
// res.render(view, locals)


MongoClient.connect("mongodb+srv://"+process.env.MONGOUN+":"+ process.env.MONGOPW + ".HIRT@huecluster0.i6cxh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useUnifiedTopology: true
  })
  .then(client => {
    console.log('Connected to Mongo Database')
    const db = client.db('HueData')
    const HueDataSensor1 = db.collection('HueDataSensor1')
    app.get('/', (req, res) => {
      db.collection('HueDataSensor1').find().toArray()
        .then(results => {
          res.render('index.ejs', {
            HueDataSensor1: results
          })
        })
        .catch( /* ... */ )

    })

  })
  .catch(error => console.error(error))

app.listen(port, function() {
  console.log('Server is listening...')
})
