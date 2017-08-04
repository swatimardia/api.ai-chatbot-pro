const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

Genre =require('./models/genre');
Book =require('./models/book');

// Connect to Mongoose
mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/', (req, res) => {
	res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', (req, res) => {
	Genre.getGenres((err, genres) => {
		if(err){
			throw err;
		}
		res.json(genres);
	});
});

app.post('/api/genres', (req, res) => {
	var genre = req.body;
	Genre.addGenre(genre, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});

app.get('/api/books', (req, res) => {
	Book.getBooks((err, books) => {
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/bot-fulfillment', (req, res) => {

    if (req.body.result.metadata.intentName == "return-publisher-names") {
    	var x;
    	var params = req.body.result.parameters;
    	for (x in params) {
    		if (params[x] != "") {
    			//query mongodb for info
    			Book.getParam(x, params[x], "publisher", (err, book) => {
    				if(err) {
    					throw err;
    				}
    				var response = "The publishers are ";
    				book.forEach(function(b) {
    					response = response + " " + b.publisher;
    				});
    				res.setHeader("Content-Type", "application/json");
    				res.json({
				        speech: response,
				        displayText: response

				    });
    				
    			});
    		}
    	}
    } else if (req.body.result.metadata.intentName == "return-author-names") {

    	var x;
    	var params = req.body.result.parameters;
    	for (x in params) {
    		if (params[x] != "") {
    			//query mongodb for info
    			Book.getParam(x, params[x], "author", (err, book) => {
    				if(err) {
    					throw err;
    				}
    				var response = "The authors are ";
    				book.forEach(function(b) {
    					response = response + " " + b.author;
    				});
    				res.setHeader("Content-Type", "application/json");
    				res.json({
				        speech: response,
				        displayText: response

				    });
    			});

    		}
    	}

    } else if (req.body.result.metadata.intentName == "return-genre-names") {

    	var x;
    	var params = req.body.result.parameters;
    	for (x in params) {
    		if (params[x] != "") {
    			//query mongodb for info
    			Book.getParam(x, params[x], "genre", (err, book) => {
    				if(err) {
    					throw err;
    				}
    				var response = "The genres are ";
    				book.forEach(function(b) {
    					response = response + " " + b.genre;
    				});
    				res.setHeader("Content-Type", "application/json");
    				res.json({
				        speech: response,
				        displayText: response

				    });
    			});

    		}
    	}

    } else if (req.body.result.metadata.intentName == "return-page-number") {

    	var params = req.body.result.parameters;
    	var book_name = params["Title"];
    	Book.getParam("Title", book_name, "pages", (err, book) => {
    		if (err) {
    			throw err;
    		}
    		response = book.pages;
    		res.setHeader("Content-Type", "application/json");
			res.json({
		        speech: response,
		        displayText: response

		    });
    	});

    } else if (req.body.result.metadata.intentName == "return-book-names") {

    	var x;
    	var params = req.body.result.parameters;
    	for (x in params) {
    		if (params[x] != "") {
    			//query mongodb for info
    			Book.getParam(x, params[x], "title", (err, book) => {
    				if(err) {
    					throw err;
    				}
    				var response = "The titles are ";
    				book.forEach(function(b) {
    					response = response + " " + b.title;
    				});
    				res.setHeader("Content-Type", "application/json");
    				res.json({
				        speech: response,
				        displayText: response

				    });
    			});

    		}
    	}
    } else if (req.body.result.metadata.intentName == "return-description") {
   
    	var params = req.body.result.parameters;
    	var book_name = params["Title"];
    	Book.getParam("Title", book_name, "description", (err, book) => {
    		if (err) {
    			throw err;
    		}
    		response = book.description;
    		res.setHeader("Content-Type", "application/json");
			res.json({
		        speech: response,
		        displayText: response

		    });
    	});
    }

});


app.listen(3000);
console.log('Running on port 3000...');
