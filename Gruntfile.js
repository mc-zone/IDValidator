module.exports = function(grunt){
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
            jasmine: {
              options: {
                specs:   'tests/spec/*.js'
            },
            IDValidator: {
              src: ['src/IDValidator.js']
            },
            IDValidatorMin: {
              src: ['IDValidator.min.js']
            }
        },
        uglify: {
            build: {
              expand:true,
              cwd: 'src', 
              src: ['*.js', '!*.min.js'], 
              dest: './', 
              ext: '.min.js'
          }
        },
        jshint: {
          options:{
              laxcomma:true
          },
          all: ['src/IDValidator.js', 'src/GB2260.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['jshint','uglify','jasmine']);
    grunt.registerTask('hint',['jshint']);
    grunt.registerTask('test',['jasmine']);
};
