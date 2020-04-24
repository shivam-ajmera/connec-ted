const accountSid = 'ACCOUNT_ID';
const authToken = 'AUTH_TOKEN';
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('API_KEY');
const client = require('twilio')(accountSid, authToken);
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
var instructions = "Please send a message in the following format:\nTo get directions: Hey Ted, give me directions from <origin> to <destination>\nTo get the latest news: Hey Ted, give me the latest news on <topic>";
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/sms', (req, res) => {
  
  	const twiml = new MessagingResponse();

  	// FOR DIRECTIONS
  	console.log('MESSAGE RECEIVED\n' + req.body.Body);
  	if(req.body.Body.split(" ")[4] == "directions"){
  		var text = req.body.Body.split(" ");
  		var textlen = text.length;
		var j = 0;
		var origin = text[6];
		for(j = 7; j < textlen; j++){
			if(text[j] == "to")
				break;
			else
			{
				origin += "+" + text[j];

			}
		}
		origin = origin.replace(",","");
		var dest = text[j+1];
		for(var k = j + 2; k < textlen; k++){
			dest += "+" + text[k];
		}
		dest = dest.replace(",","");
		var url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + origin + '&destination=' + dest + '&mode=walking&key=API_KEY';
		const fetch = require("node-fetch");
		fetch(url)
		.then(response =>{
			return response.json();
		})
		.then(users =>{
			var len = users.routes[0].legs[0].steps.length;
			var i;
			function sendMessage(data,i){
				setTimeout(function(){
				client.messages
				  .create({
				     body: data,
				     from: 'FROM_NUMBER',
				     to: 'TO_NUMBER'
				   })
				  .then(message => console.log('SMS ID: ' + message.sid));
				},i * 5000)
			}
			
			for(i = 0 ; i<len;i++){
				var message = (users.routes[0].legs[0].steps[i].html_instructions + '\n\n').replace(/<\/?[^>]+>/ig, "");
				console.log(message + '\n');
				sendMessage(message,i);
			}

			var mmsurl = 'https://maps.googleapis.com/maps/api/staticmap?zoom=auto&size=400x400&maptype=roadmap&markers=size:mid%7Ccolor:red%7Clabel:S%7C' + 
						  origin + '&markers=size:mid%7Ccolor:red%7Clabel:E%7C' + dest +'&key=APIKEY';
			setTimeout(function(){
				client.messages
				  .create({
				     body: 'This is a map for your reference',
				     from: 'FROM_NUMBER',
				     mediaUrl: [mmsurl],
				     to: 'TO_NUMBER'
				   })
				  .then(message => console.log('MMS ID:' + message.sid));
				}, i * 5000);

	});
	}
	else if(req.body.Body.split(" ")[8] == "news" && req.body.Body.split(" ")[7] == "latest" ){
			input = req.body.Body.split(" ");
			keyword = input[10];
			//category = input[2];
			//country = input[12].slice(0,2);
			newsapi.v2.everything({
  				//category: category,
  				language: 'en',
  				//country: country,
  				q: keyword,
			}).then(response => {
				function sendMessage(data,i,url){
					setTimeout(function(){
					client.messages
					  .create({
					     body: data,
					     from: 'FROM_NUMBER',
					     mediaUrl: url,
					     to: 'TO_NUMBER'
					   })
					  .then(message => console.log('SMS ID ' + message.sid));
					},i * 5000)
				}
				if(typeof response != 'undefined'){
					response = response.articles;
					var count = 1;
					var temp = 3;
					if(response.length < 3 && response)
						temp = response[i].length;
					for (var i = 0; i < temp; i++) {
						var ttl = ('TITLE: ' + response[i].title + ' Article by ' + response[i].source.name);
						var desc = response[i].description.slice(0,255);
						sendMessage(ttl,count);
						console.log(ttl + '\n');
						console.log(desc);
						sendMessage(desc,count,response[i].urlToImage);
						count += 3;
					}
				}
				// To get title- response[i].title
				// Similarly you can get description, author, source(will give an object)
				// url (to the article), urlToImage
			});
	}
	else {
		client.messages
		  .create({
		     body: 'Hey There! Looks like you did not get that message right.\n Here are some instructions:\n' + instructions,
		     from: 'FROM_NUMBER',
		     to: 'TO_NUMBER'
		   })
		  .then(message => console.log('SMS ID ' + message.sid));
	}
	twiml.message();
	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
  
});

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});

