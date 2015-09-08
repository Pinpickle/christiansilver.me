var $ = require('jquery');
var Silver = require('../silver.js');

Silver.contexts.layoutDefault = function () {
  var $header = $('.site-header');
  var $headerContent = $('.site-header-content');
  var headerTop = 0;
  var headerSnapped = false;

  $(window).on('silver:resize', function () {
    headerTop = $headerContent.offset().top;
  });

  if ($header.hasClass('site-header-image')) {
    $(window).on('silver:scroll', function () {
      if ((headerSnapped) && (Silver.scroll < headerTop)) {
        $header.removeClass('site-header-snapped');
        headerSnapped = false;
      } else if ((!headerSnapped) && (Silver.scroll >= headerTop)) {
        $header.addClass('site-header-snapped');
        headerSnapped = true;
      }
    });
  }
};
