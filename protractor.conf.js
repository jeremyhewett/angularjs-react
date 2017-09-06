exports.config = {
  directConnect: true,
  framework: 'jasmine2',
  baseUrl: 'http://localhost:8080/',
  seleniumPort: 4444,
  seleniumArgs: [],
  capabilities: {
    'browserName': 'chrome'
  },
  specs: ['./test/specs.js']
};
