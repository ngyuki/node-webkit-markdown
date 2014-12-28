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

module.exports = function(data){
    var elems = marked(data.toString())
    return {
        elems: elems
    };
};
