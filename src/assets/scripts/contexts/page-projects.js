'use strict';
var $ = require('jquery');
var Silver = require('../silver.js');

Silver.contexts.page_projects = function () {
  $('.projects-listing').masonry({
    itemSelector: '.projects-listing-element',
    columnWidth: $('.projects-listing-element')[0],
    percentPosition: true
  });
};
