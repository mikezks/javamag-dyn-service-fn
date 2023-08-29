const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'fn-validate-passenger-status',

  exposes: {
    './fn': './projects/plugins/fn-validate-passenger-status/util-validation/passenger-status.validator.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
