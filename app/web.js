var gui = require('nw.gui');
var app = require('./app');

app.init(gui.App.argv);

document.write(app.baseTag());

$(function(){
    app.start(function(html){
        var $container = $('#container');
        $container.html(html);
        $('title').text($container.find('h1:eq(0)').text());
    });
});
