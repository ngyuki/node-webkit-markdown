// for react.js on node-webkit
global.document= window.document;
global.navigator= window.navigator;

// for marked-react on node.js
global.React = require('react');

var fs = require('fs');
var path = require('path');
var watchr = require('watchr');
var exec = require('child_process').exec;
var markdown = require('./lib/markdown');

var vars = {
    filename: "",
    callback: function(){},
};

function init(argv) {
    var fn = null;

    for (var i=0; i<argv.length; i++) {
        if (argv[i] != '-') {
            fn = argv[i];
            break;
        }
    }

    if (fn == null) {
        throw new Error("Invalid commandline arguments");
    }

    // resolve absolute path
    if (process.env.PWD) {
        fn = path.resolve(process.env.PWD, fn);
    }

    vars.filename = fn;
}

function start(callback) {
    vars.callback = callback;
    render(vars.filename, callback);
    watch(vars.filename, callback);
}

function watch(filename, callback) {
    watchr.watch({
        paths: filename,
        listeners: {change: function (event, fn) {
            render(filename, callback);
        }},
        catchupDelay: 250,
        interval: 500
    });
}

function render(filename, callback) {
    fs.readFile(filename, function (err, data) {
        if (err) throw err;
        callback(markdown(data.toString()));
    });
}

function baseUrl() {
    return vars.filename;
}

function open(url) {
    if (openable(url)) {
        exec('start ' + url);
    }
}

function openable(url) {
    return /^file:\/\/\//.test(url) == false;
}

module.exports = {
    init: init,
    start: start,
    watch: watch,
    render: render,
    baseUrl: baseUrl,
    open: open,
    openable: openable
};
