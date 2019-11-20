/* To inject page specific scripts into the response template */

const fs = require('fs');
/* `assets.json` file holds the webpack generated js file names in a JSON. */
/* From `assets.json` we take out the generic and the route specific js files and add it to the response */
const ASSETS_JSON_PATH = 'assets.json';

const ScriptMapper = {

	assets: {},

	// To update the `assets` property with all the contents of assets.json
	init: function() {
		const hasAssetFile = fs.existsSync(ASSETS_JSON_PATH);
		if (hasAssetFile) {
			this.assets = JSON.parse(fs.readFileSync(ASSETS_JSON_PATH));
		}
	},

	createTag: function(tag, url, rel, attributes = '') {
		const tagCreator = {
			script:`<script type="text/javascript" charset="utf-8" src="${url}" defer></script>`,
			link:`<link rel="${rel || 'stylesheet'}" charset="utf-8" href="${url}" media="all" type="text/css" ${attributes}></link>`
		};
		return tagCreator[tag];
	},

	/* Find the js bundles need for each route and add it to the return scripts.
	NOTE: Check the newly generated bundle property from assets.json whenever a new route is added and modify the `scriptConstructor` as needed */

	constructScript: function(route) {
		const { main, vendor } = this.assets;
		const { FILE_HOST = '', NODE_ENV = '' } = process.env;
		const ASSET_URL = '/dist/'; // NODE_ENV === 'dev' ? ('/dist/')  : (FILE_HOST + '/dist/');
		const js_vendor_location =  ASSET_URL + vendor.js;
		const homeScriptUrl = ASSET_URL + main.js;
		return this.createTag('script', js_vendor_location) + this.createTag('script', homeScriptUrl);
	}

}

module.exports = {
  ScriptMapper
}