'use strict';

const fs = require('fs'),
      path = require('path'),
      mkdirp = require('mkdirp'),
      yaml = require('js-yaml'),
      nunjucks = require('nunjucks');

class NunjucksRenderPlugin {
    constructor(options) {
        this.baseDir = options.baseDir;
        this.files = options.files;
        this.config = nunjucks.configure(options.baseDir);
    }

    apply(compiler) {
        // compiler.plugin("compile", function() {});

        compiler.plugin("compilation", () => {
            this.files.forEach((file) => {
                let context = yaml.load(fs.readFileSync(file.context));
                file.rendered = nunjucks.render(file.template, context);
            });
            // compilation.plugin("optimize", function() {});
        });

        compiler.plugin("emit", (compilation, callback) => {
            this.config.loaders.forEach((l) => {
                Object.keys(l.pathsToNames).forEach((name) => {
                    compilation.fileDependencies.push(name);
                });
                l.cache = {};
            });
            this.files.forEach((f) => {
                compilation.fileDependencies.push(path.join(
                    compiler.context,
                    f.context
                ));
                console.log('Writing ' + f.outFile);
                mkdirp.sync(path.dirname(f.outFile));
                fs.writeFileSync(f.outFile, f.rendered);
            });
            callback();
        });
    }
}

module.exports = NunjucksRenderPlugin;
