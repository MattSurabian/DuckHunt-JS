module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        lint: {
            files: ['grunt.js', 'duckhunt/*.js']
        },
        min: {
            duckhunt: {
                src: ['duckhunt/dog.js', 'duckhunt/duck.js', 'duckhunt/gun.js', 'duckhunt/player.js', 'duckhunt/duckhunt.js', 'duckhunt/weapons.js', 'duckhunt/levels.js'],
                dest: 'build/duckhunt.min.js'
            },
            libs: {
                src: ['lib/jquery.js', 'lib/underscore.js', 'lib/jquery.spritely-0.6.js'],
                dest: 'build/libs.min.js'
            }

        },
        compress: {
            build: {
                files:{
                    'build/build.js.gz' : ['build/duckhunt.min.js','libs.min.js']
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Default task(s).
    grunt.registerTask('default', ['lint', 'min']);
    grunt.registerTask('build', ['min','compress']);
};