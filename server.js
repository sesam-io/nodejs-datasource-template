// Load the http module to create an http server.
var http = require('http');
var Router = require('node-simple-router');
var url = require('url');

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

var router = Router();

// Configure router to respond with a list of entities to /entities
router.get("/entities", function (request, response) {
  var since = url.parse(request.url, true).query.since;
  response.writeHead(200, {"Content-Type": "application/json"});
  response.end(JSON.stringify(dataAccessLayer.getEntities(since)));
});

// Configure our HTTP server to use router function
var server = http.createServer(router);

// Listen on port 5000, IP defaults to 127.0.0.1
server.listen(5000, "0.0.0.0");

// Put a friendly message on the terminal
console.log("Server running at http://0.0.0.0:5000/");
