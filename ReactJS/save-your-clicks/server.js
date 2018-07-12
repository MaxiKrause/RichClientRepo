const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 5000;
const dbName = "saveyourclicks";

const result = dotenv.config();
var util = require('util');
 
if (result.error) {
  throw result.error
}

app.use(bodyParser.json());

app.post('/api/saveusers', (req, res) => {
	//MONGOLAB_URI needs to bet set as environment variable
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		const db = client.db(dbName);
		
		const collection = db.collection("users");
		let document = {_id: req.body.sub};

		console.log(document);
		
		
		collection.insert(document, function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				console.log("Record added as "+records[0]._id);
			}
		});
	});
});

app.post('/api/saveComponent', (req, res) => {
	//MONGOLAB_URI needs to bet set as environment variable
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		const db = client.db(dbName);
		
		const collection = db.collection("Components");
		let document = req.body.Component;

		console.log("TEST: " + util.inspect(document));

		
		collection.insert(document, function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				console.log("Record added as "+records[0]);
			}
		});
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
