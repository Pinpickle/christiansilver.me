var $ = require('jquery');
var bulk = require('bulk-require');

var Silver = {
  contexts: { },
  width: 0,
  height: 0,
  scroll: 0
};

function throttle(fn, threshhold, scope) {
  threshhold = threshhold || (threshhold = 250);
  var last;
  var deferTimer;
  return function () {
    var context = scope || this;

    var now = +(new Date());
    var args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

var $window = $(window);
var resize = function () {
  Silver.width = $window.width();
  Silver.height = $window.height();

  $window.trigger('silver:resize');
};

var scroll = function () {
  Silver.scroll = $window.scrollTop();
  $window.trigger('silver:scroll');
}

Silver.contexts.common = function common() {
  $window.resize(throttle(resize, 200));
  $window.scroll(throttle(scroll, 30));
};

Silver.contexts.post = function post() {
  resize();
  scroll();
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

    main.contexts.post();
  };

  $(document).ready(main.ready);
};

module.exports = Silver;

bulk(__dirname, 'contexts/*.js');
