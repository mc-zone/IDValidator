module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner:  '/*\n'
                        +' * <%= pkg.main %> v<%= pkg.version %>\n'
                        +' * <%= pkg.description %>\n'
                        +' * Author: <%= pkg.author %>\n'
                        +' * E-mail: <%= pkg.mail %>\n'
                        +' * Released under the <%= pkg.license %> license\n'
                        +' * Date: <%= grunt.template.today("yyyy-mm-dd") %>\n'
                        +' */\n'
            },
            build: {
              expand:true,
              cwd: '', 
              src: ['<%= pkg.main %>', '!*.min.js'], 
              dest: '', 
              ext: '.min.js'
          }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',['uglify']);
};
