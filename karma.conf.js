module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['requirejs', 'qunit', 'es6-shim', 'fixture'],
    files: [
      'test/test-main.js',
      { pattern: 'js/*.js', included: false },
      { pattern: 'test/*Spec.js', included: false },
      { pattern: 'test/*.html' },
      { pattern: 'node_modules/jquery/dist/jquery.js', included: false },
      { pattern: 'node_modules/handlebars/dist/handlebars.js', included: false },
      { pattern: 'node_modules/wolfy87-eventemitter/EventEmitter.js', included: false },
      { pattern: 'node_modules/lodash/lodash.js', included: false },
    ],
    exclude: [
      'js/main.js'
    ],
    preprocessors: {
      'js/**/*.js': ['babel', 'coverage'],
      'test/**/*.js': ['babel'],
      '**/*.html': ['html2js']
    },
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    concurrency: Infinity
  });
};
