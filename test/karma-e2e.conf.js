basePath = '../',

  files = [
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    'test/e2e/**/*.js'
  ],

  autoWatch = false,

  browsers = [process.env['KARMA_BROWSER'] || 'Firefox'],

  reporters = ['dots'],

  frameworks = ['ng-scenario'],

  singleRun = false,

  runnerPort = process.env['KARMA_RUNNER_PORT'] || 9102,
  proxies = {
    '/': 'http://localhost:8006/'
  },

  urlRoot = "/__testacular/",

  plugins = [
    'karma-junit-reporter',
    'karma-chrome-launcher',
    'karma-firefox-launcher',
    'karma-jasmine',
    'karma-ng-scenario'
  ],

  junitReporter = {
    outputFile: 'test_out/e2e.xml',
    suite: 'e2e'
  }