var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

app.use(express.static('public'));


app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// Missing :date returns current date
app.get('/api', function(req, res) {
	res.json({unix: new Date().getTime(), utc: new Date()});
})


app.get('/api/:date', function(req, res) {
	const numericDate = Number(req.params.date)
	let date;
	
	if (isNaN(numericDate)) {
		date = new Date(req.params.date);
	} else {
		date = new Date(numericDate);
	}
	
	if (date == 'Invalid Date')	{
		res.json({ error: 'Invalid Date' })
	} else {
		res.json({unix: date.getTime(), utc: date.toUTCString()});
	}
	
})


var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
