module.exports = function(grunt) {

	// Project configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		less: {
			development: {
				options: {
				  paths: [""]
				},
				files: {
				  "spreadsheet.css": "spreadsheet.less"
				}
			},
			production: {
				options: {
				  paths: '<%= less.development.options.paths %>',
				  yuicompress: true
				},
				files: '<%= less.development.files %>'
			}
		},
		uglify: {
			options: {
				compress: true,
                beautify: false,
				report: 'min'
			},
			build: {
				src: ['spreadsheet.js'],
				dest: 'spreadsheet.min.js'
			}
		},
		watch: {
			less: {
				files: ['spreadsheet.less'],
		      	tasks: ['less:development']
			},
			js: {
				files: ['spreadsheet.js'],
		      	tasks: ['uglify']
			} 
		}
	});

	// Load the plugins
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default Tasks(s)
	grunt.registerTask('default',['uglify', 'less:development']);
	grunt.registerTask('deploy',['uglify','less:production'])


};