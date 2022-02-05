const path = require('path');
const express = require('express');
const http = require('http');
const port = 3000;

function runServer(port) {
  const expressServer = express();
  const router = express.Router();
  const httpServer = http.Server(expressServer);

  router.get('/', (req ,res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

  expressServer.use(express.static(__dirname));

  //add the router
  expressServer.use('/', router);
  httpServer.listen(port, () => console.log(`server started on port ${port}. Open: http://localhost:3000` ));
}

runServer(port);
