var fs = require('fs');
var path = require('path');
var watchr = require('watchr');
var escape = require('escape-html');
var exec = require('child_process').exec;
var markdown = require('./lib/markdown');

var options = {
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

    options.filename = fn;
}

function start(callback) {
    options.callback = callback;
    render(options.filename, callback);
    watch(callback);
}

function watch(callback) {
    watchr.watch({
        paths: options.filename,
        listeners: {change: function (event, filename) {
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

function baseTag() {
    return '<base href="file:///{}">'.replace('{}', escape(options.filename));
}

function open(url) {
    if (/^file:\/\/\//.test(url)){
        //
    } else {
        exec('start ' + url);
    }
}

module.exports = {
    init: init,
    start: start,
    watch: watch,
    render: render,
    baseTag: baseTag,
    open: open
};
