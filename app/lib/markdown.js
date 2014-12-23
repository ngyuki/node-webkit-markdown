var marked = require('marked');
var highlight = require('highlight.js');

marked.setOptions({
    highlight: function (code, lang) {
        if (lang != null && highlight.getLanguage(lang)) {
            return highlight.highlight(lang, code).value;
        } else {
            return highlight.highlightAuto(code, []).value;
        }
    }
});

function myRenderer(){}

myRenderer.prototype = new marked.Renderer();
myRenderer.prototype.constructor = myRenderer;
myRenderer.super = marked.Renderer.prototype;

myRenderer.prototype.table = function(header, body){
    return '<table class="table table-bordered">\n'
        + '<thead>\n'
        + header
        + '</thead>\n'
        + '<tbody>\n'
        + body
        + '</tbody>\n'
        + '</table>\n'
    ;
};

myRenderer.prototype.heading = function(text, level, raw){
    if (this.title == null && level == 1){
        this.title = text;
    }
    return myRenderer.super.heading.apply(this, arguments);
};

module.exports = function(data){
    var renderer = new myRenderer();
    var body = marked(data.toString(), { renderer: renderer })
    return {
        title: renderer.title,
        body: body
    };
};
