const path = require("path");
const fs = require("fs");

// get folder with relative path, e.g: src/ folder
const resolveApp = (relativePath) => path.resolve(__dirname, relativePath);
// get src/
const appSrc = resolveApp("src");

function getEntries() {
  const entry = {};

  // get path to src/components/
  const componentsPath = path.join(appSrc, "components");

  // get every folder names inside src/components/
  const foldersList = fs.readdirSync(componentsPath);

  foldersList.forEach((folder) => {
    const filePath = path.join(componentsPath, `${folder}/index.js`);
    entry[folder] = filePath;
  });

  return entry;
}

module.exports = {
  mode: "development",
  // specifies where webpack will start bundle code
  // defaults to ./src/index.js
  entry: getEntries(),

  // specifies where webpack will output the bundle result
  // defaults to ./dist/bundle.js
  output: {
    filename: "[name].[fullhash].js",
  },

  // helps with debugging
  // https://developer.mozilla.org/en-US/docs/Tools/Debugger/How_to/Use_a_source_map
  devtool: "inline-source-map",

  module: {
    rules: [
      // test for files with.
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
        resolve: {
          extensions: [".js", ".jsx"],
        },
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
