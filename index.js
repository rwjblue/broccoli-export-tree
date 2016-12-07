var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var CachingWriter = require('broccoli-caching-writer');
var helpers = require('broccoli-kitchen-sink-helpers');

ExportTree.prototype = Object.create(CachingWriter.prototype);
ExportTree.prototype.constructor = ExportTree;
function ExportTree (inputNode, options) {
  if (!(this instanceof ExportTree)) return new ExportTree(inputNode, options);

  options = options || {};
  CachingWriter.call(this, [inputNode], options);

  this.options = options;

  if (this.options.clobber === undefined) { this.options.clobber = true; }
};

ExportTree.prototype.build = function () {
  if (this.options.clobber) {
    rimraf.sync(this.options.destDir);
  }

  console.log(this.inputPaths[0], this.options.destDir);
  helpers.copyRecursivelySync(this.inputPaths[0], this.options.destDir);
};

module.exports = ExportTree;
