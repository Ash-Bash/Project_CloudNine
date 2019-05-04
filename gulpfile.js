var gulp = require("gulp");  
const webpack = require('webpack-stream');
var typescript = require('gulp-tsc');
const ts = require('gulp-typescript');
var tsConfig = require("tsconfig-glob");  
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

const tsClientConfig = ts.createProject('./src/client/tsconfig.json', { jsx: 'react'});

var paths = {
    pages: ['src/client/views/*{.html|.ejs}'],
    assets: ['src/client/assets']
};

gulp.task("copy:html", async function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist/client"));
});

gulp.task("copy:assets", async function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest("dist/client"));
});

gulp.task("compile:client", async function () {  
    return gulp.src('src/client/ts/client.tsx')
    .pipe(webpack( require('./webpack.client.js') ))
    .pipe(gulp.dest('dist/client'));
});

gulp.task("compile:server", async function () {  
    return gulp.src('src/server/server.ts')
    .pipe(webpack( require('./webpack.server.js') ))
    .pipe(gulp.dest('dist/server'));
});

gulp.task("compile:all", gulp.series(gulp.parallel(['compile:server', 'compile:client'])));

gulp.task("deploy:client", gulp.series(gulp.parallel(['compile:client', 'copy:html', 'copy:assets'])));

gulp.task("watch", function () {  
    var tsConfigFile = require("./src/client/tsconfig.json");
    gulp.watch(tsConfigFile.filesGlob, ["tsconfig-glob"]).on("change", reportChange);
});