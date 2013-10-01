module.exports = function (grunt) {

	grunt.initConfig({
		copy: {
			latest: {
				files: [{
					src: ['funcunit.js'],
					dest: 'dist/latest/',
					expand: true,
					cwd: 'funcunit/dist/'
				}]
			},

			example: {
				files: [{
					src: ['funcunit.js'],
					dest: 'examples/resources/',
					expand: true,
					cwd: 'funcunit/dist/'
				}]
			},

			jasmine: {
				files: [{
					src: ['jasmine-html.js',
						'jasmine.js',
						'jasmine.css',
						'lib/qunit/qunit/*',
						'lib/jquery/jquery.js'],
					dest: 'examples/resources/',
					expand: true,
					cwd: 'lib/jasmine/lib/jasmine-core/'
				}]
			},

			qunit: {
				files: [{
					src: ['*'],
					dest: 'examples/resources/',
					expand: true,
					cwd: 'lib/qunit/qunit/'
				}]
			},

			jquery: {
				files: [{
					src: ['jquery.js'],
					dest: 'examples/resources/',
					expand: true,
					cwd: 'lib/jquery/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['copy']);

};