'use strict';
require('./css/jumbotron-narrow.css');
require('./css/style.css');

(function() {
    function resetSubmit() {
        const els = document.getElementsByName('commit');
        if (els.length === 0) {
            setTimeout(resetSubmit, 500);
        } else {
            els[0].value = 'Subscribe';
        }
    }
    setTimeout(resetSubmit, 500);
})();
