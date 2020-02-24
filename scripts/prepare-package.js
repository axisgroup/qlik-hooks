var pkg = require("../package.json")
var fs = require("fs")
var path = require("path")

// Copy package to dist folder
const modPkg = {
  ...pkg,
  main: "./index.js",
  module: "./index.es.js",
  sideEffects: false,
}

fs.writeFile(path.join(__dirname, "../dist/package.json"), JSON.stringify(modPkg, null, "\t"), function(err) {
  if (err) console.log(err)
})

fs.copyFile(path.join(__dirname, "../README.md"), path.join(__dirname, "../dist/README.md"), function(err) {
  if (err) console.log(err)
})
