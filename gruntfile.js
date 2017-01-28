// ******************** NodeJS packages ********************
const grunt = require('grunt');

// ******************** Script ********************
grunt.initConfig({
    babel: {
        options: {
            sourceMaps: true,
            presets: ['es2015', 'es2016', 'es2017']
        },
        dist: {
            files: [{
                expand: true,
                cwd: 'src',
                src: ['**/*.js'],
                dest: 'build/',
                ext: '.js'
            }]
        }
    }
    
   , clean: {
       build: ['build/'],
       doc : ['doc/']
   }

   , eslint: {
       target: {
           expand: true
         , cwd   : 'src'
         , src   : ['**/*.js']
         , dest  : 'build/'
         , ext   : '.js'}
   }

   , mocha : {
       test: {
           src: ['src\\**\\__test__\\**\\*.js'],
           opts : 'mocha.opts'
       }
   }

   , watch: {
       scripts: {
           files: ['src/**/*.js'
                , 'gruntfile.js'
                , 'package.json'
                , '.eslintrc.js']
        , tasks: ['build']
        , options: {
            atBegin : true
            , spawn   : false
        }
       }
   }

});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-babel');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-eslint');
grunt.loadNpmTasks('grunt-mocha');

// Registering all tasks
grunt.registerTask('lint', ['eslint']);
grunt.registerTask('build', ['eslint', 'clean:build', 'babel']);
grunt.registerTask('default', ['build']);
