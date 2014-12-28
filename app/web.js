var gui = require('nw.gui');
var app = require('./app');
var highlight = require('highlight.js');

app.init(gui.App.argv);

markedReact.setOptions({
    highlight: function (code, lang) {
        if (lang != null && highlight.getLanguage(lang)) {
            return highlight.highlight(lang, code).value;
        } else {
            return highlight.highlightAuto(code, []).value;
        }
    }
});

var Markdown = React.createClass({
    getInitialState: function() {
        return { text: "loading..." };
    },
    render: function() {
        return React.createElement('div', {className: 'Markdown'}, markedReact(this.state.text));
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

    app.start(function(text){
        var win = gui.Window.get();
        //win.title = obj.title + ' - ' + gui.App.manifest.window.title;

        react.setState({text: text})

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
