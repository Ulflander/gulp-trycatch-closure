var through = require('through'),
    gutil = require('gulp-util'),
    Buffer = require('buffer').Buffer,
    PluginError = gutil.PluginError,
    File = gutil.File,
    extend = require('util')._extend;

module.exports = function (options) {
    var file = null;

    function write (f){
        if (!f.isNull()) {
            if (f.isStream()) {
                this.emit('error', new PluginError('gulp-trycatch-closure',  
                    'Streaming not supported'));
            } else {
                file = f;
                var newFile;

                options = extend({
                    logger: 'console.warn(e);'
                }, options);

                newFile = new File({
                    cwd: file.cwd,
                    base: file.base,
                    path: file.path,
                    contents: Buffer.concat([
                        new Buffer(';try {' + gutil.linefeed),
                        file.contents,
                        new Buffer(gutil.linefeed + '} catch(e) { ' +
                            options.logger + ' };')
                    ])
                });

                this.emit('data', newFile);
            }
        }
    }

    function end () {
        this.emit('end');
    }

    return through(write, end);
};
