const fs = require("fs");

/* Assigns the variable set in the path: `configs/build/{BUILD_ENV}/build_env.js`  to `process.env` */
function getBuildEnvContent(path) {
  require('dotenv').config({ path });
}

 /**
 * @param {boolean} isServer - true if `get_globals` is called on server startup
 */

function get_globals(isServer) {
  const {BUILD_ENV} = process.env;
  if (!BUILD_ENV) {
    throw new Error('process.env.BUILD_ENV is missing');
  }
  const BUILD_CONFIG_PATH = `configs/build/${BUILD_ENV}/build_env.js`;
  getBuildEnvContent(BUILD_CONFIG_PATH);

  const { FILE_HOST } = process.env;
  const globalVariables = {
    FILE_HOST,
  };
  return globalVariables;
}

module.exports = {
  get_globals
};
