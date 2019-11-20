const path = require('path');
const express = require('express');
const { get_globals } = require('../env_setter');
get_globals(true);
const {setServerRoutes} = require('./template');

const { PORT = 8090 } = process.env;

const appServer = express();
appServer.use(express.static('public'));
setServerRoutes(appServer);

appServer.listen(PORT, (err) => {
	if (err) {
		throw err;
	}
	console.log(`Running on: http://localhost:${PORT}/`);
});
