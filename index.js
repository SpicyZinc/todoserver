/**
 * @fileoverview Todo server for programming test.
 * @author nzakas
 */

'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var express = require('express'),
	bodyParser = require('body-parser'),
	assign = require('object-assign');


//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------

var data = {},
	id = 0,
	app = express();

//------------------------------------------------------------------------------
// Server
//------------------------------------------------------------------------------

app.use(bodyParser());

// enable CORS
app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Max-Age', 7200);
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// Randomly return an error
app.use(function(req, res, next) {

	var error,
		random = Math.round(Math.random() * 100) + 1;

	if (random < 0) {
		error = new Error('A random server error occurred.');
	}

	next(error);
});

app.get('/todo/tasks', function(req, res, next) {
	var tasks = Object.keys(data).map(function(key) {
		return data[key];
	});

	console.log(req.url);
	res.json(tasks);
});

app.use(express.static(__dirname + '/public'));


app.post('/todo/tasks/create', function(req, res, next) {
	var task = req.body;
	console.log(req.url);

	if (Object.keys(task).length) {

		task.id = ++id;

		data[task.id] = task;

		console.log('Created ' + JSON.stringify(task));
		console.log('Created task %d', task.id);

		res.json(task);
	} else {
		console.log('No data found in request body; no task created.');
		res.json(500, { message: 'No data found in request body.' });
	}

});


app.post('/todo/tasks/:id/edit', function(req, res, next) {

	var task = req.body,
		taskId = req.params.id;

	console.log(req.url);

	if (taskId in data) {
		console.log('Received ' + JSON.stringify(task));
		console.log('Edited task %d', taskId);

		task.id = taskId;
		assign(data[taskId], task);
		res.json(task);
	} else {
		console.log('Task %d not found', taskId);
		res.send(404);
	}

});

app.listen(9898);
console.log('Started listening on port 9898');
