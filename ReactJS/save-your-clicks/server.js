const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const Babel = require('babel-core');

const app = express();
const port = process.env.PORT || 5000;
const dbName = "saveyourclicks";

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
				console.error(err);
				res.status(201).send(err);
			}
			else {
				console.log("Record added as "+records[0]._id);
			}
		});
	});
});

app.get('/api/babel', (req, res) => {
	let code = `code();`

	let test = Babel.transformFile("DragCard.js", {
  		plugins: ["transform-runtime"]},
  		(err, result) => {console.log(result);});
	
});




app.listen(port, () => console.log(`Listening on port ${port}`));
