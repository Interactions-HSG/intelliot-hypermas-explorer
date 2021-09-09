#!/usr/bin/env node

// Management dashboard webserver
//
// Interactions Research Group, University of St.Gallen
// Based on work by Ralf Mosshammer / Siemens AG (2015) and Simon Mayer / Pro2Future AG (2017)

var Server = function (settings) {

    var ALLOW_X_ORIGIN = true

    // Imports
    var express = require('express')
    var http = require('http')
    var less = require('less')
    var fs = require('fs')
    var path = require('path')
    var hbs = require('handlebars')
    var child_process = require('child_process')
    var url = require('url')

    var self = this

    // Directories
    var cBaseDir = '..'
    var cLessDir = path.join(cBaseDir, 'less')
    var cCssDir = path.join(cBaseDir, 'css')
    var cTemplateDir = path.join(cBaseDir, 'templates')

    // Express application
    var app = express()
    var bodyParser = require('body-parser');

    var httpServer = http.Server(app)
    var server_port = 8090
    var rawBodySaver = function (req, res, buf, encoding) {
        if (buf && buf.length) {
            req.rawBody = buf.toString(encoding || 'utf8');
        }
    }
    app.use(express.static(cBaseDir))
    app.use('/templates', express.static(cTemplateDir))
    app.use(bodyParser.json({ verify: rawBodySaver }));
    app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
    app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

    // All the less files to render
    var lessInput = [
        'color',
        'main',
        'cards'
    ]

    const PROGRESS_STARTED = 'progress_started'
    const PROGRESS_FINISHED = 'progress_finished'

    // Convert less files
    this.convertLessFiles = function (conversion_done_callback) {

        console.log('Compiling less files ...')

        var done = lessInput.length

        var failCounter = 0
        for (inputFile in lessInput) {

            // Need immediate function here to scope input
            (function processInput(input) {

                var lessInputFile = input + '.less'
                var cssOutputFile = input + '.css'

                // Render less input to css output
                less
                    .render(fs.readFileSync(path.join(cLessDir, lessInputFile), 'utf-8'),
                        {
                            paths: [cLessDir],
                            filename: lessInputFile,
                            compress: false
                        })
                    .then(function (output) {
                            console.log('  Writing ' + cssOutputFile)
                            fs.writeFileSync(path.join(cCssDir, cssOutputFile), output.css, 'utf-8')
                            done -= 1
                            if (done <= 0) {
                                conversion_done_callback.call(this)
                            }
                        },
                        function (error) {
                            console.error(error);
                            throw error;
                            failCounter += 1;
                        }
                    )

            })(lessInput[inputFile])

        }


    }

    this.listen = function () {

        // Open the HTTP server port and listen ...
        httpServer.listen(server_port, function () {
            console.log('Listening on *:%d ...', server_port)
        })
    }

    this.run = function () {
        this.convertLessFiles(function done() {
            self.listen()
        })
    }
}

module.exports = exports = new Server();
