/*
 * grunt-2x-image-check
 * https://github.com/ChrisGrant/grunt-2x-image-check
 *
 * Copyright (c) 2015 Chris Grant
 * Licensed under the MIT license.
 */

var checker = require('./checker');

module.exports = function(grunt) {
  grunt.registerMultiTask(
    'retina-image-check',
    'Checks that you have retina versions of your images in a specified directory.',
    function() {
      if (this.data.negateOutput) {
        return !checker.check(this.data);
      } else {
        return checker.check(this.data);
      }
    }
  );
};
