"use strict";

requirejs.config({
  paths: {
    'jquery': '../node_modules/jquery/dist/jquery',
    'handlebars': '../node_modules/handlebars/dist/handlebars',
    'eventEmitter': '../node_modules/wolfy87-eventemitter/EventEmitter',
    'lodash': '../node_modules/lodash/lodash'
  },
  map: {
    '*': { 'jquery': 'jquery-private' },
    'jquery-private': { 'jquery': 'jquery' }
  }
});

require(["app"], App => {
  App.initialize();
});
