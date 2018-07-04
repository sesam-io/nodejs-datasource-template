var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var url = require('url');

var parserLimit = process.env.PARSER_LIMIT || '1000kb';

function DataAccessLayer() {
  var entities = [];
  var now = Date.now();
  for (i = 0; i < 10; i++) {
    entities.push({
      "_id": "entity-" + i,
      "name": "entity-" + i,
      "_updated": now + i
    })
  }
  this.getEntities = function (since) {
    if (since == undefined) {
      return entities;
    } else {
      return entities.filter(function (e) {
        return e["_updated"] > since;
      });
    }
  }
}

var dataAccessLayer = new DataAccessLayer();

var app = express();

app.use(bodyParser.json({limit: parserLimit}));
app.use(morgan('tiny'));

// Configure router to respond with a list of entities to /entities
app.get("/entities", function (request, response) {
  var since = url.parse(request.url, true).query.since;
  response.writeHead(200, {"Content-Type": "application/json"});
  response.end(JSON.stringify(dataAccessLayer.getEntities(since)));
});

// Listen on port 5000, IP defaults to 127.0.0.1
app.listen(5000, "0.0.0.0", function () {
  console.log("Server running at http://0.0.0.0:5000/");
});
