'use strict';

module.exports = function (grunt) {

  var path = require('path');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    src: {
      // This will cover all JS files in 'js' and sub-folders
      js: ['app/js/**/*.js'],
      templates: ['app/partials/**/*.html']
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

    express: {
      testServer: {
        options: {
          server: path.resolve(__dirname, 'app.js'),
          port: 8006
        }
      }
    },

    karma: {

      unit_travis: {
        configFile: '<%= test.karmaConfig %>',
        singleRun: true,
        reporter: 'dots'
      },
      unit_local: {
        configFile: '<%= test.karmaConfig %>',
        singleRun: true,
        reporter: 'progress',
        browsers: ['Chrome']

      },
      e2e_travis: {

        configFile: '<%= test.karmaE2EConfig %>',
        singleRun: true,
        reporters: ['dots']
      },
      e2e_local: {
        configFile: '<%= test.karmaE2EConfig %>',
        singleRun: true,
        reporters: ['progress'],
        browsers: ['Chrome']

      }

    },

    /**connect: {
      web: {
        options: {
          port: 8000,
          bases: '.',
          keepalive: true
        }
      }
    },**/

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
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('web', ['connect:web']);

  var runInTravis = grunt.option('runInTravis') || false;
  var buildEnvironment;
  if (runInTravis) {
    buildEnvironment = 'travis';
  }
  else {
    buildEnvironment = 'local';
  }

  console.log('Running build in mode: ' + buildEnvironment);

  grunt.registerTask('startServer', ['express']);
  grunt.registerTask('test', ['karma:unit_' + buildEnvironment]);
  grunt.registerTask('integration-test', [ 'startServer', 'karma:e2e_' + buildEnvironment]);


  grunt.registerTask('default', ['concurrent:dev']);


};