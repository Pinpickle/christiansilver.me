'use strict';
var $ = require('jquery');

var Silver = {
  contexts: { }
};

Silver.contexts.common = function common() {

};

Silver.run = function () {
  var main = Silver;
  main.ready = function ready() {
    main.contexts.common();
    var classes = $('body').attr('class').replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); }).split(/\s+/);
    classes.forEach(function (item) {
      if (main.contexts[item]) {
        main.contexts[item]();
      }
    });
  };

  $(document).ready(main.ready);
};

module.exports = Silver;

