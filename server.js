const express = require("express");
const parser = require("body-parser");
var Filter = require('bad-words');

filter = new Filter();

const app = express();
var searchTerm = "Lovely Kittens";

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(parser.urlencoded({ extended:false }));
app.use(parser.json())

app.get('/', (req, res) => {
  res.render('index', {
  	title: 'GooseGooseGo'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
  	title: 'GooseGooseGo - About'
  });
});

app.post('/', (req, res, next) => {
	if(filter.isProfane(req.body.search)){
		var redirectString = "https://duckduckgo.com/?q=" + "be+polite+please" + "&t=h_&search_plus_one=form&ia=web";
		res.redirect(redirectString);
		return;
	}

	var redirectString = "https://duckduckgo.com/?q=" + searchTerm + "&t=h_&search_plus_one=form&ia=web";
	searchTerm = req.body.search.replace(" ", "+");
	res.redirect(redirectString);
	return;
})





const server = app.listen(7000);
