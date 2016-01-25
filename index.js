'use strict';

// Documentation for Brunch plugins:
// https://github.com/brunch/brunch/blob/master/docs/plugins.md

// Remove everything your plugin doesn't need.
class ElmCompiler {
  constructor(config) {
    // Replace 'plugin' with your plugin's name;
    this.config = config && config.plugins && config.plugins.elm;
  }

  // file: File => Promise[Boolean]
  // Called before every compilation. Stops it when the error is returned.
  // Examples: ESLint, JSHint, CSSCheck.
  // lint(file) { return Promise.resolve(true); }

  // file: File => Promise[File]
  // Transforms a file data to different data. Could change the source map etc.
  // Examples: JSX, CoffeeScript, Handlebars, SASS.
  compile(file) {
    console.log('Compiling: ', file.path);

    var childProcess = require('child_process')
      , outputFile   = 'web/static/vendor/seatsaver.js'
      , srcFile      = 'SeatSaver.elm'
      , elmFolder    = 'web/elm';

    childProcess.exec('elm make --yes --output ' + outputFile + ' ' + srcFile, {cwd: elmFolder}, function (error, stdout, stderr){
      return callback(error, error ? stderr : null);
    });
    return Promise.resolve(file);
  }

  // file: File => Promise[Array: Path]
  // Allows Brunch to calculate dependants of the file and re-compile them too.
  // Examples: SASS '@import's, Jade 'include'-s.
  // getDependencies(file) { return Promise.resolve(['dep.js']); }

  // file: File => Promise[File]
  // Usually called to minify or optimize the end-result.
  // Examples: UglifyJS, CSSMin.
  // optimize(file) { return Promise.resolve({data: minify(file.data)}); }

  // files: [File] => null
  // Executed when each compilation is finished.
  // Examples: Hot-reload (send a websocket push).
  // onCompile(files) {}

  // Allows to stop web-servers & other long-running entities.
  // Executed before Brunch process is closed.
  // teardown() {}
}

// Required for all Brunch plugins.
ElmCompiler.prototype.brunchPlugin = true;

// Required for compilers, linters & optimizers.
// 'javascript', 'stylesheet' or 'template'
ElmCompiler.prototype.type = 'javascript';

// Required for compilers & linters.
// It would filter-out the list of files to operate on.
// ElmCompiler.prototype.extension = 'js';
// ElmCompiler.prototype.pattern = /\.js$/;
ElmCompiler.prototype.extension = 'elm';

// Indicates which environment a plugin should be applied to.
// The default value is '*' for usual plugins and
// 'production' for optimizers.
// ElmCompiler.prototype.defaultEnv = 'production';

module.exports = ElmCompiler;
