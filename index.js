'use strict';

// Documentation for Brunch plugins:
// https://github.com/brunch/brunch/blob/master/docs/plugins.md

class ElmCompiler {
  constructor(config) {
    this.config = config && config.plugins && config.plugins.elm;
  }

  compile(file) {
    console.log('Compiling: ', file);

    var childProcess = require('child_process')
      , path         = require('path')
      , elmFolder    = path.dirname(file.path)
      , srcFile      = path.basename(file.path)
      , outputFile   = 'web/static/vendor/' + srcFile.toLowerCase().replace('elm', 'js')
      , command      = 'elm make --yes --output ' + outputFile + ' ' + srcFile;

    childProcess.exec(command, {cwd: elmFolder}, function (error, stdout, stderr){
      console.log('Result:', error, stdout, stderr);
    });

    return Promise.resolve(file);
  }
}

ElmCompiler.prototype.brunchPlugin = true;
ElmCompiler.prototype.type = 'javascript';
ElmCompiler.prototype.extension = 'elm';

module.exports = ElmCompiler;
