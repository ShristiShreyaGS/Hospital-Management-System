module.exports = {
  default: {
    paths: ['client/tests/features/*.feature'],
    require: [
      'client/tests/steps/*.steps.js',
      'client/tests/support/world.js',
    ],
    publishQuiet: true
  }
};