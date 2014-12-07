var gui = require('nw.gui');
var app = require('./app');

app.init(gui.App.argv);

document.write(app.baseTag());

$(function(){
    app.start(function(html){
        $('#container').html(html);
        $('title').text($('#container h1:eq(0)').text());
    });
});
