(function () {
    'use strict';

    var express = require('express');
    var path = require('path');
    var bodyParser = require('body-parser');
    var fs = require('fs');
    var PythonShell = require('python-shell');

    var app = express();
    var publicPath = path.join(__dirname, '/');
    var port = 6431;

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.static(publicPath));

    app.post('/fileName', (req, res, next) => {
      var pyshell = new PythonShell('py/main.py', { scriptPath: publicPath } );
      pyshell.send(req.body.url);
      pyshell.on('message', function (message) {
        console.log(message)
        // if (req.params.fileName === 'whatever') {
        //   res.json(message)
          //next()
        // }
      });
      pyshell.end(function (err) {
        if (err) throw err;
        console.log('finished');
      });
      res.end();
    });

    var server = app.listen(port, function () {
        console.log('Express server listening on port ' + server.address().port);
    });

    module.exports = app;

}());
