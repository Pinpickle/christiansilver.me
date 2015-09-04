'use strict';
var $ = require('jquery');
var Silver = require('../silver.js');

function onResize(e) {
  var width = $(window).width();
  var maxWidth = 300;
  if (width < 600) {
    maxWidth = 200;
  }

  var boxNumber = Math.max(1, Math.floor(width / maxWidth));
  var percentage = (100 / boxNumber) + '%';

  $('.projects-listing-element').css({ width: percentage });
}

Silver.contexts.page_projects = function () {
  onResize();
  $(window).resize(onResize)
};
