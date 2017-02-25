const helpers = require.context('./helpers', true, /\.js?$/);
helpers.keys().forEach(c => helpers(c));

const context = require.context('.', true, /\.spec\.jsx?$/);
context.keys().forEach(c => context(c));
