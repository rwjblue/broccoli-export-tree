var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var CachingWriter = require('broccoli-caching-writer');
var helpers = require('broccoli-kitchen-sink-helpers')

ExportTree.prototype = Object.create(CachingWriter.prototype);
ExportTree.prototype.constructor = ExportTree;
function ExportTree (inputTree, options) {
  if (!(this instanceof ExportTree)) return new ExportTree(inputTree, options);

  this.inputTree = inputTree;
  this.destDir   = options.destDir;
  this.clobber   = true;

  if (options.hasOwnProperty('clobber')) { this.clobber = options.clobber; }
};

ExportTree.prototype.updateCache = function (srcDir, destDir) {
  if (this.clobber) {
    rimraf.sync(this.destDir);
  }

  helpers.copyRecursivelySync(srcDir, this.destDir);
};

module.exports = ExportTree;
