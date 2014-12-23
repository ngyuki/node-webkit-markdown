var gui = require('nw.gui');
var app = require('./app');

app.init(gui.App.argv);

document.write(app.baseTag());

$(function(){
    $(document).on('click', 'a[href]', function(ev){
        ev.preventDefault();
        app.open(this.href);
    });
    app.start(function(obj){
        var win = gui.Window.get();
        win.title = obj.title + ' - ' + gui.App.manifest.window.title;

        $('#container').html(obj.body);

        setTimeout(function(){
            $('a[href]').filter(function(){
                return !app.openable(this.href);
            })
            .css({
                "cursor": "default",
                "text-decoration": "none",
            });
        }, 0);
    });
});
