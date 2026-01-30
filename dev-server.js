/**
 * dev-server - serves static resources for developing global-weather-visualization locally
 */

"use strict";

console.log("============================================================");
console.log(new Date().toISOString() + " - Starting");

var express = require("express");
var compression = require("compression");
var morgan = require("morgan");

/**
 * Adds headers to a response to enable caching.
 */
function cacheControl() {
    return function(req, res, next) {
        res.setHeader("Cache-Control", "public, max-age=300");
        return next();
    };
}

/**
 * Returns true if the response should be compressed.
 */
function compressionFilter(req, res) {
    return (/json|text|javascript|font/).test(res.getHeader('Content-Type'));
}

var port = process.argv[2] || 8080;
var app = express();

// Custom morgan format
morgan.token('date', function() {
    return new Date().toISOString();
});

app.use(cacheControl());
app.use(compression({filter: compressionFilter}));
app.use(morgan(':date - :method :url :status :response-time ms'));
app.use(express.static("public"));

app.listen(port, function() {
    console.log("Listening on port " + port + "...");
    console.log("Open http://localhost:" + port + " in your browser");
});
