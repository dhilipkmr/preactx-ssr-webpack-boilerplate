const { h } = require('preact');
const render = require('preact-render-to-string');
const { ScriptMapper } = require('./scriptMapper');
const App = require('../src/App');

// Loading generated assets' location
const mapper = Object.create(ScriptMapper);
mapper.init();

/**
 * @param {string} builtFileHTML - Generated scripts, styles added with appropriate tag names and returned as string.
 * Component to be Rendered based on Routes is Decided by preact-router at App.
 */
const respondWithTemplate = (req, res) => {
	let body = render(<App.default url={req.url}/>);
	const builtFileHTML = mapper.constructScript(req.url);

	res.setHeader('Content-Type', 'text/html');
	res.send(
		`<!DOCTYPE html>
		 <html lang="en">
			<head>
				${builtFileHTML}
			</head>
			<body class="greyBg">
				<div id="app">
					${body}
				</div>
			</body>
		</html>`
	);
};


const healthCheckRoute = (req, res) => {
	res.send('pong');
};

const appRoute = (req, res) => {
	updateRouteMatch(req.path);
	respondWithTemplate(req, res);
};

/**
 * @param {object} appServer - Express server
 */
function setServerRoutes(appServer) {
	appServer.get('/health', healthCheckRoute);
	appServer.get('/*', respondWithTemplate);
}

module.exports = {
	setServerRoutes
}
