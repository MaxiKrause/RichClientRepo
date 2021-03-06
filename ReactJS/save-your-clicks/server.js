const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const dotenv = require('dotenv');

const app = express();
const port = process.env.PORT || 5000;
const dbName = "saveyourclicks";

const path = require('path');

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
		
		collection.insert(document, function(err, records){
			if (err){
				res.status(201).send(err);
			}
			else {
				res.status(200).send('OK');
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
		let document = req.body;
		
		collection.insert(document, function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				res.status(200).send("OK");
			}
		});
	});
});

app.get('/api/getComponents', (req, res) => {
	const userid = req.query.userid;
	if (!userid) {
		res.status(201).send("Keinen User Angegeben!");
	}
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.log(err);
			res.status(201).send(err);
		}

		const db = client.db(dbName);

		const collection = db.collection("Components");

		collection.find({userid: userid}).toArray((err, docs) => {
			if(err) {
				res.status(201).send(err);
			}
			else {
				console.log(docs);
				res.status(200).send(docs);
			}

		});
	});
});

app.post ('/api/savewidget', (req, res) => {
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		var objectId = new ObjectID().toString();
		var obj = {[objectId]: [	
         {
			name: req.body.name,
			position: {x: 0, y:0},
			settings: req.body.settings
         }
      ] };
		const db = client.db(dbName);
		const collection = db.collection("users");

		collection.update({_id: req.body.userid}, {$set: obj}, {upsert:true}, function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				res.status(200).send(objectId);
			}
		});
	});
});

app.post('/api/getwidgets', function(req, res){
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		const db = client.db(dbName);
		const collection = db.collection("users");
		let document = {_id: req.body.userid};

		collection.find(document).toArray(function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				console.log(req.body)
				res.status(200);
				res.send(records);
			}
		});
	});
});

app.post ('/api/savewidgetposition', (req, res) => {
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		const db = client.db(dbName);
		const collection = db.collection("users");
		
		console.log(req.body)
		
		var obj = {[req.body.widgetid]: [	
        {
			name: req.body.name,
			position: req.body.position,
			settings: req.body.settings
         }
        ]};
		collection.update({_id: req.body.userid}, {$set: obj}, {upsert:true}, function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				res.status(200).send();
			}
		});
	});
});

app.post('/api/getwidgetposition', function(req, res){
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		const db = client.db(dbName);
		const collection = db.collection("users");
		let document = {_id: req.body.userid};

		collection.find(document).toArray(function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				res.status(200);
				res.send(records);
			}
		});
	});
});

app.post ('/api/deleteWidget', (req, res) => {
	MongoClient.connect(process.env.MONGOLAB_URI, function(err, client) {
		if (err) {
			console.error(err);
			res.status(201).send(err);
		}
		
		const db = client.db(dbName);
		const collection = db.collection("users");
		
		var obj = {[req.body.widgetid]: [	
        {
         }
        ]};
		collection.update({_id: req.body.userid}, {$unset: obj}, {upsert:true}, function(err, records){
			if (err){
				console.error(err);
				res.status(201).send(err);
			}
			else {
				res.status(200).send();
			}
		});
	});
});

app.listen(port, () => console.log(`Listening on port ${port}`));

