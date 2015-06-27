/*
 * grunt-2x-image-check
 * https://github.com/ChrisGrant/grunt-2x-image-check
 *
 * Copyright (c) 2015 Chris Grant
 * Licensed under the MIT license.
 */

 var sizeOf = require('image-size');
 var grunt = require('grunt');

 module.exports = {

 	check: function(opts) {
 		this.success = true;

 		var files = [];

 		grunt.file.recurse(opts.src, function callback(abspath, rootdir, subdir, filename) {
 			if (filename.indexOf(".") != 0) {
 				files.push(abspath);
 			}
 		});

 		for (var i = files.length - 1; i >= 0; i--) {
 			var file = files[i];

 			if (file.indexOf('@2x') > -1) {

 				var nonRetinaCounterpartName = file.replace('@2x', '');

 				if (!grunt.file.exists(nonRetinaCounterpartName)) {
 					grunt.log.error('Retina file ' + file + " doesn't have a @1x counterpart");
 					this.success = false;
 				}
 				else {
 					this.checkDimensions(file, nonRetinaCounterpartName, 2);
 				}
 			}
 			else {
 				var retinaCounterpartName = file.replace(".", "@2x.");

 				if (!grunt.file.exists(retinaCounterpartName)) {
 					grunt.log.error('File ' + file + " doesn't have a @2x counterpart");
 					this.success = false;
 				}
 				else {
				// Check that if it does exist, it is the right size.
				this.checkDimensions(file, retinaCounterpartName, 0.5);
				}
			}
		}

		return this.success;
	},

	checkDimensions:function(sourceFile, comparisonFile, proportion) {
		// Check that if it does exist, it is the right size.
		var dimensions = this.getImageSize(sourceFile);
		var counterpartDimensions = this.getImageSize(comparisonFile);

		if (!counterpartDimensions || 
		Math.round(counterpartDimensions.width * proportion) !== dimensions.width || 
		Math.round(counterpartDimensions.height * proportion) !== dimensions.height) 
		{
			grunt.log.writeln("Wrong Dimensions for " + sourceFile + ". At @" + proportion +  "x, they should be " + Math.round(counterpartDimensions.width * proportion) + "x" + (Math.round(counterpartDimensions.height * proportion)) + "px, not " + dimensions.width + "x" + dimensions.height + "px");
		}
	},

	getImageSize: function(path) {
		return sizeOf(path);
	}

};
