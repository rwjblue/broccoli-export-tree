var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var Writer = require('broccoli-writer');
var helpers = require('broccoli-kitchen-sink-helpers')

ExportTree.prototype = Object.create(Writer.prototype);
ExportTree.prototype.constructor = ExportTree;
function ExportTree (inputTree, options) {
  if (!(this instanceof ExportTree)) return new ExportTree(inputTree, options);

  this.inputTree = inputTree;
  this.destDir   = options.destDir;
  this.clobber   = true;

  if (options.hasOwnProperty('clobber')) { this.clobber = options.clobber; }
};

ExportTree.prototype.write = function (readTree, destDir) {
  var self = this

  return readTree(this.inputTree).then(function (srcDir) {
    if (self.clobber) {
      rimraf.sync(self.destDir);
    }

    helpers.copyRecursivelySync(srcDir, self.destDir);
  })
};

module.exports = ExportTree;
