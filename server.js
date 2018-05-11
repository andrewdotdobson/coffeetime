const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

const MongoClient = require('mongodb').MongoClient
var db

MongoClient.connect('mongodb://add-coffeetime-app:cawffe33_T1fE@ds119070.mlab.com:19070/add-coffeetime', (err, client) => {
	//start the db server
	if (err) return console.log(err)
		db = client.db('add-coffeetime')
	startServing();
})


app.use(bodyParser.urlencoded({extended: true}))


// Route to home
app.get('/', (req, res) => {
	
	var cursor = db.collection('quotes').find().toArray(function(err, results) {
		console.log(results)

	})


/*
	var lastItem = db.collection('quotes').find().limit(1).sort({$natural:-1}).toArray(function(err, results) {
		
		
		res.render('index', {title: 'Coffeetime', message: results[0].name})
	})
*/	
	// render page
	//res.sendFile(__dirname + '/index.html')
	//res.render('index', { title: 'Andrew\'s page', message: lastEntry.name  })
	// res.send('Hello World')
})

//route to post data to the DB

app.post('/quotes', (req, res) => {
	// create collection and add the post data to it
  db.collection('quotes').save(req.body, (err, result) => {
  	if (err) return console.log(err) //handle any errors
    console.log('saved to db')
  	res.redirect('/')
  })
})



function startServing(){

	app.listen(3000, function() {
	  console.log('listening on 3000 and base directory is ' + __dirname)
	})
}