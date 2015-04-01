module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'js/*.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    sass: {
			options: {
				sourceMap: true,
				outputStyle: 'compressed'
			},
			dist: {
				files: {
					'css/global.css': 'sass/global.scss',
          'css/article.css': 'sass/article.scss'
				}
			}
		}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('deploy', ['sass']);

};
