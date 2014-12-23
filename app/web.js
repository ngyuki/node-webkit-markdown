var gui = require('nw.gui');
var app = require('./app');

app.init(gui.App.argv);

document.write(app.baseTag());

$(function(){
    $(document).on('click', 'a[href]', function(ev){
        ev.preventDefault();
        app.open(this.href);
    });
    app.start(function(html){
        var $container = $('#container');
        $container.html(html);
        var win = gui.Window.get();
        win.title = $container.find('h1:eq(0)').text() + ' - ' + gui.App.manifest.window.title;
    });
});
