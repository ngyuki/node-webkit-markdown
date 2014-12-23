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

var renderer = new marked.Renderer();

renderer.table = function(header, body){
    return '<table class="table table-bordered">\n'
        + '<thead>\n'
        + header
        + '</thead>\n'
        + '<tbody>\n'
        + body
        + '</tbody>\n'
        + '</table>\n'
    ;
}

module.exports = function(data){
    return marked(data.toString(), { renderer: renderer })
};
