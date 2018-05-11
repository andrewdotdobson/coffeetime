const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'))

var users = ["Oonagh", "Tarns"]
var whoPaysToday = users[0]
var totalO = 1
var totalT = 1
var totalCoffees = totalO + totalT

var lastItem
var userIndex = 0
var nextCoffeeBy = 'Oonagh'

var moment = require('moment');

const MongoClient = require('mongodb').MongoClient


MongoClient.connect('mongodb://add-coffeetime-app:cawffe33_T1fE@ds119070.mlab.com:19070/add-coffeetime', (err, client) => {
	//start the db server
	if (err) return console.log(err)
		db = client.db('add-coffeetime')
	startServing();
})


app.use(bodyParser.urlencoded({extended: true}))

// GET routes

app.get('/', (req, res) => {
	
	var cursor = db.collection('coffeehistory').find().limit(1).sort({$natural:-1}).toArray(function(err, results) {
		if(results.length>0){
			lastItem = results[0]
			// now we have the lastitem object matching the last entry into the DB.  Let's do something with it.

			if(lastItem.whoBoughtIt == users[0])
			{
				whoPaysToday = users[1]
			} else {
				whoPaysToday = users[0]
			}
			console.log(whoPaysToday)
			res.render('index', {results: lastItem, whoPaysToday: whoPaysToday})
		} else {
			db.collection('coffeehistory').save(
			{
				timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
				whoBoughtIt: whoPaysToday,
				totalO: 0,
				totalT: 0,
				totalCoffees: 0
			}, (err, result) => {
			if (err) return console.log(err)
			res.redirect('/')
		})
		}
	})
/*
	var lastItem = db.collection('quotes').find().limit(1).sort({$natural:-1}).toArray(function(err, results) {
		
		
		res.render('index', {title: 'Coffeetime', message: results[0].name})
	})
*/	
	// render page
	//res.sendFile(__dirname + '/index.html')
	
	// res.send('Hello World')
})


app.get('/history', (req,res) => {

	var cursor = db.collection('coffeehistory').find().toArray(function(err,results) {
		res.render('history.pug', {results: results})
	})
})



// POST routes

app.post('/postACoffee', (req, res) => {
	console.log(req.body)

	if(req.body != 'skip')
	{
		postACoffee(req,res)
	} else {
		incrementUserIndex()
		res.redirect('/')
	}
})


function postACoffee(req,res) {

	lastItem.timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a')
	lastItem.whoBoughtIt = whoPaysToday
	if(whoPaysToday == "Oonagh")
	{
		lastItem.totalO ++
	} else {
		lastItem.totalT ++
	}
	lastItem.totalCoffees++
	delete lastItem._id;
	db.collection('coffeehistory').save(
		lastItem, (err, result) => {
			if (err) return console.log(err)
			res.redirect('/')
		})

}

function incrementUserIndex()
{
	console.log('next user')
}
function startServing(){

	app.listen(3000, function() {
	  console.log('listening on 3000 and base directory is ' + __dirname)
	})
}