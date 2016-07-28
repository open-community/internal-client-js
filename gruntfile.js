'use strict';
var grunt = require('grunt');

grunt.initConfig({
    babel: {
        options: {
            sourceMap: true,
            presets: ['es2015']
        },
        dist: {
            files: [{
               expand: true,
               cwd: 'src',
               src: [ '**/*.js'],
               dest: 'build/',
               ext: '.js'
            }]
        }
    }
    
   , clean: ['build/']

   , eslint: {
        target: {
            expand: true
          , cwd   : 'src'
          , src   : [ '**/*.js']
          , dest  : 'build/'
          , ext   : '.js'}
     }

   , watch: {
      scripts: {
         files: [ 'src/**/*.js'
                , 'gruntfile.js'
                , 'package.json'
                , '.eslintrc.js']
        , tasks: ['build']
        , options: {
            spawn: false
         }
      }
}

});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-eslint');

// Registring all tasks
grunt.registerTask('build', ['clean', 'eslint', 'babel']);
grunt.registerTask('default', ['build']); 