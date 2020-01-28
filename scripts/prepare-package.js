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

// // Qlik Class Entrypoints
// const classes = [
//   "Doc",
//   "Field",
//   "GenericBookmark",
//   "GenericDerivedFields",
//   "GenericDimension",
//   "GenericMeasure",
//   "GenericObject",
//   "GenericVariable",
//   "Global",
//   "Variable"
// ];
// classes.forEach(qClass => {
//   var operatorFolder = path.join(__dirname, "../src", qClass);
//   var operatorOutputFolder = path.join(__dirname, "../dist", qClass);
//   mkDir(operatorOutputFolder);

//   fs.readdir(operatorFolder, (err, files) => {
//     if (err) return console.log(err);
//     createPackage("index.js", qClass, operatorOutputFolder, 1);
//   });
// });

// function createPackage(filename, folderPath, outputFolder, depth) {
//   var trail = "../".repeat(depth);

//   var pkg = {
//     main: `${trail}_cjs/${folderPath}/${filename}`,
//     module: `${trail}_esm5/${folderPath}/${filename}`,
//     es2015: `${trail}_esm2015/${folderPath}/${filename}`,
//     sideEffects: false
//   };

//   mkDir(outputFolder);

//   fs.writeFile(
//     path.join(outputFolder, "package.json"),
//     JSON.stringify(pkg, null, "\t"),
//     function(err) {
//       if (err) console.log(err);
//     }
//   );
// }

// function mkDir(dir) {
//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir);
//   }
// }
