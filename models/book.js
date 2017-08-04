const mongoose = require('mongoose');

request_json = require('request-json');
var client = request_json.createClient('https://api.api.ai/v1/entities/');

// Book Schema
const bookSchema = mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	description:{
		type: String
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String
	},
	pages:{
		type: String
	},
	image_url:{
		type: String
	},
	buy_url:{
		type: String
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});


const Book = module.exports = mongoose.model('Book', bookSchema);

//param1 - find each book with param = param1;; and select the param2 field
module.exports.getParam = (param, param1, param2, callback) => {

	if (param == "genre") {
		//Book.findOne({genre : param1}, param2, callback);
		Book.find({genre: param1}, param2, callback);
	} else if (param == "author") {
		Book.find({author : param1}, param2, callback);
	} else if (param == "Title") {
		Book.find({title : param1}, param2, callback);
	} else if (param == "description"){
		Book.find({description: param1}, param2, callback);
	} else if (param == "publisher") {
		Book.find({publisher: param1}, param2, callback);
	}
}

// Get Books
module.exports.getBooks = (callback, limit) => {
	Book.find(callback).limit(limit);
}

// Get Book
module.exports.getBookById = (id, callback) => {
	Book.findById(id, callback);
}

// Add Book
module.exports.addBook = (book, callback) => {
	Book.create(book, callback);
	//add the entities to the bot as well

	client.post("Title/entries?v=20150910",
	[{
		"value":book.title,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("genre/entries?v=20150910",
	[{
		"value":book.genre,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("publisher/entries?v=20150910",
	[{
		"value":book.publisher,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("PAGE/entries?v=20150910",
	[{
		"value":book.pages,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("author/entries?v=20150910",
	[{
		"value":book.author,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

}

// Update Book
module.exports.updateBook = (id, book, options, callback) => {
	var query = {_id: id};
	var update = {
		title: book.title,
		genre: book.genre,
		description: book.description,
		author: book.author,
		publisher: book.publisher,
		pages: book.pages,
		image_url: book.image_url,
		buy_url: book.buy_url
	}
	Book.findOneAndUpdate(query, update, options, callback);

	//update the entities to the bot as well

	client.post("Title/entries?v=20150910",
	[{
		"value":book.title,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("genre/entries?v=20150910",
	[{
		"value":book.genre,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("publisher/entries?v=20150910",
	[{
		"value":book.publisher,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("PAGE/entries?v=20150910",
	[{
		"value":book.pages,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

	client.post("author/entries?v=20150910",
	[{
		"value":book.author,
		"synonyms": []
	}],
	{
		"auth": {
			"bearer": "7be2701da8314c0ea06a1344615d19e3"
		}
	}, (error, response, body) => {
		console.log('error:', error); // Print the error if one occurred 
	  	console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  	console.log('body:', body); // Print the HTML for the Google homepage. 
	});

}

// Delete Book
module.exports.removeBook = (id, callback) => {
	var query = {_id: id};
	Book.remove(query, callback);

	//remove the entities from the bot as well
	//problem is that the same publisher/genre/author/pages can be shared by another book

}
