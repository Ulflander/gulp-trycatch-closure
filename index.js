var through = require("through"),
  gutil = require("gulp-util"),
  Buffer = require("buffer").Buffer,
  PluginError = gutil.PluginError,
  File = gutil.File;

module.exports = function () {
  var file = null;

  function write (f){
    if (!f.isNull()) {
      if (f.isStream()) {
        this.emit("error", new PluginError("gulp-trycatch-closure",  "Streaming not supported"));
      } else {
        file = f;
      }
    }
  }

  function end () {
    var newFile;

    newFile = new File({
      cwd: file.cwd,
      base: file.base,
      path: file.path,
      contents: Buffer.concat([
        new Buffer(";try {" + gutil.linefeed),
        file.contents,
        new Buffer(gutil.linefeed + "} catch(e) { console.warn(e); };")
      ])
    });

    this.emit("data", newFile);
    this.emit("end");
  }

  return through(write, end);
};
