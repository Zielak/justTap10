'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dev:{
        options: {
          
        },
        src: 'src/*.sass',
        dest: 'public/styles.css',
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/**/*.js'],
      options: {
        "globals": {
          "$": false
        },
        "node": true,
        "esversion": 6
      }
    },
    copy: {
      main: {
        files: [
          {expand: true, src: ['src/**.html'], dest: 'public/', flatten: true, filter: 'isFile'},
        ]
      }
    },
    concat: {
      dist: {
        src: ['src/js/Game.js', 'src/js/Table.js', 'src/js/Block.js', 'src/js/end.js'],
        dest: 'public/script.js',
      },
    },
    watch: {
      sass: {
        files: 'src/**/*.sass',
        tasks: ['sass'],
      },
      js: {
        files: 'src/**/*.js',
        tasks: ['jshint', 'concat'],
        options: {
          livereload: true,
        },
      },
      other: {
        files: 'src/*.html',
        tasks: ['copy'],
        options: {
          livereload: true,
        },
      },
      livereload: {
        // Here we watch the files the sass task will compile to
        // These files are sent to the live reload server after sass compiles to them
        options: { livereload: true },
        files: ['public/**/*'],
      },
    },
    
    connect: {
      server: {
        options: {
          port: 9001,
          base: 'public',
          livereload: true
        }
      }
    }


  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');


  grunt.registerTask('default', ['sass', 'jshint', 'concat', 'copy']);

  // Default task(s).
  grunt.registerTask('serve', 'Compile then start a connect web server', function() {
    grunt.task.run([
      'sass',
      'jshint',
      'concat',
      'copy',
      'connect',
      'watch'
    ]);
  });

};