const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);
	webpack.Utils.addCopyRule("**/*.mp3");
	webpack.Utils.addCopyRule("**/*.ogg");
	webpack.Utils.addCopyRule("**/*.jpg");
	webpack.Utils.addCopyRule("**/*.png");
	webpack.Utils.addCopyRule("**/*.sqlite");
	// Learn how to customize:
	// https://docs.nativescript.org/webpack

	return webpack.resolveConfig();
};
