module.exports = exports = {
  config: {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['bear_spec.js'],
    onPrepare: function() {
      require('babel-core/register');
    }
  }
};
