var gui = require('nw.gui');
var app = require('./app');

app.init(gui.App.argv);

var Markdown = React.createClass({
    getInitialState: function() {
        return { elems: [] };
    },
    render: function() {
        return React.createElement('div', {className: 'Markdown'}, this.state.elems);
    },
});

$(function(){
    $('#base').attr('href', app.baseUrl());

    $(document).on('click', 'a[href]', function(ev){
        ev.preventDefault();
        app.open(this.href);
    });

    var react = React.render(
        React.createElement(Markdown, null),
        document.getElementById('container')
    );

    app.start(function(obj){
        var win = gui.Window.get();
        //win.title = obj.title + ' - ' + gui.App.manifest.window.title;

        react.setState({elems: obj.elems})

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
