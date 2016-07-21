/* eslint-disable */
var context = require.context('./src/client/app', true, /.+\.spec\.js?$/);
context.keys().forEach(context);
module.exports = context;