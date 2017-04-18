# nodejs-datasource-template
A NodeJS micro service template for feeding a JSON entity stream to a Sesam service instance.

```
$ cd service && npm install && npm run start
<some-path>/nodejs-datasource-template/service
└── node-simple-router@0.10.0 

npm WARN service No description
npm WARN service No repository field.
npm WARN service No license field.

> @ start <some-path>/nodejs-datasource-template/service
> node server.js

Server running at http://0.0.0.0:5000/
```

The service listens on port 5000. JSON entities can be retrieved from 'http://localhost:5000/entities'.

```
$ curl -s 'http://localhost:5000/entities' | jq .
[
  {
    "_id": "entity-0",
    "name": "entity-0",
    "_updated": 1492520353572
  },
  {
    "_id": "entity-1",
    "name": "entity-1",
    "_updated": 1492520353573
  },
  {
    "_id": "entity-2",
    "name": "entity-2",
    "_updated": 1492520353574
  },
  {
    "_id": "entity-3",
    "name": "entity-3",
    "_updated": 1492520353575
  },
  {
    "_id": "entity-4",
    "name": "entity-4",
    "_updated": 1492520353576
  },
  {
    "_id": "entity-5",
    "name": "entity-5",
    "_updated": 1492520353577
  },
  {
    "_id": "entity-6",
    "name": "entity-6",
    "_updated": 1492520353578
  },
  {
    "_id": "entity-7",
    "name": "entity-7",
    "_updated": 1492520353579
  },
  {
    "_id": "entity-8",
    "name": "entity-8",
    "_updated": 1492520353580
  },
  {
    "_id": "entity-9",
    "name": "entity-9",
    "_updated": 1492520353581
  }
]
```

```
$ curl -s 'http://localhost:5000/entities?since=1492520353577' | jq .
[
  {
    "_id": "entity-6",
    "name": "entity-6",
    "_updated": 1492520353578
  },
  {
    "_id": "entity-7",
    "name": "entity-7",
    "_updated": 1492520353579
  },
  {
    "_id": "entity-8",
    "name": "entity-8",
    "_updated": 1492520353580
  },
  {
    "_id": "entity-9",
    "name": "entity-9",
    "_updated": 1492520353581
  }
]
```