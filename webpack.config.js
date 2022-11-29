const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);
	webpack.Utils.addCopyRule("**/*.mp3");
	webpack.Utils.addCopyRule("**/*.ogg");
	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};
