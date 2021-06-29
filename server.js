const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const path = require('path')

// dotenv baby
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(favicon(path.join(__dirname, 'views', 'favicon.ico')))

app.set('view engine', 'ejs')
// res.render(view, locals)


MongoClient.connect("mongodb+srv://"+process.env.MONGOUN+":"+ process.env.MONGOPW + "@huecluster0.i6cxh.mongodb.net/HueData?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(client => {
    console.log('Connected to Mongo Database')
    const db = client.db('HueData')
    const HueDataSensor1 = db.collection('HueDataSensor1')
    app.get('/', (req, res) => {
      db.collection('HueDataSensor1').find().toArray()
        .then(results => {
          console.log(results);
          res.render('index.ejs', {
            HueDataSensor1: results
          })
        })
        .catch( /* ... */ )

    })

  })
  .catch(error => console.error(error))


// app.get('/', (req, res) => {
//   // db.collection('quotes').find().toArray()
//   //   .then(/* ... */)
//   //   .catch(/* ... */)
//   res.render('index.ejs', {})
// })

  app.listen(port, () => console.log(`Listening on port ${port}`));
