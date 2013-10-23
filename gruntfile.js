'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    src: {
      // This will cover all JS files in 'js' and sub-folders
      js: ['app/js/**/*.js'],
      templates: ['app/partials/**/*.html']
    },

    develop: {
      server: {
        file: 'app.js'
      }
    },


    //JS Test files
    test: {
      karmaConfig: 'test/karma.conf.js',
      karmaE2EConfig: 'test/karma-e2e.conf.js',
      unit: ['test/unit/**/*.js'],
      integration: ['test/e2e/scenarios.js']
    },

    // Configure Lint\JSHint Task
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: {
        src: ['gruntfile.js', '<%= src.js %>', '<%= test.unit %>', '<%= test.integration %>']
      }
    },

    karma: {
      unit: {
        configFile: '<%= test.karmaConfig %>',
        singleRun: true
      },
      continuous: {
        configFile: '<%= test.karmaE2EConfig %>',
        singleRun: true
      }

    },


    connect: {
      web: {
        options: {
          port: 8000,
          bases: '.',
          keepalive: true
        }
      }
    },

    watch: {
      jshint: {
        files: ["<%= src.js %>", "<%= test.unit %>", "<%= test.integration %>"],
        tasks: ['jshint']
      }
    },

    concurrent: {
      dev: {
        tasks: [ 'integration-test', 'test', 'jshint'],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-develop');

  grunt.registerTask('web', ['connect:web']);
  grunt.registerTask('test', ['karma:unit']);
  grunt.registerTask('integration-test', ['karma:continuous']);

  grunt.registerTask('default', ['concurrent:dev']);


};