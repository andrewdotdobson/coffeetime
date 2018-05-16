const express = require('express')
const bodyParser = require('body-parser')
const app = express()
//app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(express.static('public'))

var users = ["Oonagh", "Tarns"]
var lastItem
var userIndex
var collectionSize
var isSkipped = false

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
	console.log('//////////////////////////////')

	var cursor = db.collection('coffeehistory').find().toArray(function(err,results) {
//	var cursor = db.collection('coffeehistory').find().limit(1).sort({$natural:-1}).toArray(function(err, results) {
//	var cursor = db.collection('coffeehistory').find({}).sort({'key': -1}).limit(1).toArray(function(err,results) {
		collectionSize = results.length;
		
		if(collectionSize>0){
			lastItem = results[results.length-1]
			userIndex = lastItem.userID
			//console.log("the last db item userID was "+userIndex)
			//console.log("taken at " + lastItem.timeStamp)
			//console.log("total size of collection is "+collectionSize)
			incrementUserIndex()
			if(isSkipped){
				incrementUserIndex()
				isSkipped = false
			}
			res.render('index', {whoPaysToday: users[userIndex]})
			
			} else {
				db.collection('coffeehistory').save(
				{
					timeStamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
					userID: 0,
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
		
		08082343325
		9026664
		res.render('index', {title: 'Coffeetime', message: results[0].name})
	})
*/	
	// render page
	//res.sendFile(__dirname + '/index.html')
	
	// res.send('Hello World')
})


app.get('/history', (req,res) => {

	var cursor = db.collection('coffeehistory').find().sort( { _id: -1 } ).toArray(function(err,results) {

		console.log(results)

		res.render('history.pug', {results: results, users: users})
	})
})



// POST routes

app.post('/postACoffee', (req, res) => {

	console.log(req.body)
	if(req.body.whichPerson == 'skip')
	{
		console.log("we've skipped a user")
		isSkipped = true
		res.redirect('/')
	} else {
		postACoffee(req,res)	
	}
})


function postACoffee(req,res) {

	var newEntry = {}
	newEntry.timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a')
	newEntry.userID = userIndex
	//newEntry.totalCoffees = lastItem.totalCoffees++
	
	db.collection('coffeehistory').save(
		newEntry, (err, result) => {
			if (err) return console.log(err)
			res.redirect('/')
		})

}

function incrementUserIndex()
{
	console.log("increment userIndex from " + userIndex)
	userIndex++
	if(userIndex>=users.length)
	{
		userIndex = 0
	}
	//console.log('next user: '+ userIndex + ' of ' + users.length + ' username ' + users[userIndex])
}
function startServing(){

	app.listen(3000, function() {
	  console.log('listening on 3000 and base directory is ' + __dirname)
	})
}