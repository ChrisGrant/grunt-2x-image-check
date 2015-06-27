/*
 * grunt-2x-image-check
 * https://github.com/ChrisGrant/grunt-2x-image-check
 *
 * Copyright (c) 2015 Chris Grant
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  grunt.initConfig({
    eslint: {
      target: ['tasks/', 'Gruntfile.js']
    },

  	grunt.loadTasks('tasks');

  	grunt.loadNpmTasks('grunt-eslint');

  	grunt.registerTask('lint', ['eslint']);
};
