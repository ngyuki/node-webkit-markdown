var gui = require('nw.gui');
var app = require('./app');

$(function(){
    app.init(gui.App.argv);
    app.start(function(html){
        $('#container').html(html);
        $('title').text($('#container h1:eq(0)').text());
    });
});
