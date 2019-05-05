var gulp = require("gulp");  
const webpack = require('webpack-stream');
var typescript = require('gulp-tsc');
const ts = require('gulp-typescript');
var tsConfig = require("tsconfig-glob");  
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

const tsClientConfig = ts.createProject('./src/client/tsconfig.json', { jsx: 'react'});

var paths = {
    pages: ['src/client/views/*.pug'],
    assets: ['src/client/assets']
};

gulp.task("copy:html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist/client"));
});

gulp.task("copy:assets", function () {
    return gulp.src(paths.assets)
        .pipe(gulp.dest("dist/client"));
});

gulp.task("copy:all", gulp.series(gulp.parallel(['copy:html', 'copy:assets'])));

gulp.task("compile:client", function () {
    var tsproject = ts.createProject('./src/client/tsconfig.json');
    return tsproject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsproject()).js
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./tmp/js'));
});

gulp.task("compile:server", function () {  
    return gulp.src('src/server/server.ts')
    .pipe(webpack( require('./webpack.server.js') ))
    .pipe(gulp.dest('dist/server'));
});

gulp.task("compile:all", gulp.series(gulp.parallel(['compile:server', 'compile:client'])));

gulp.task("deploy:client", gulp.series(gulp.parallel(['compile:client', 'copy:html', 'copy:assets'])));

gulp.task("clean", function () {
    return gulp
        .src([
            './tmp/',
            './dist/'
        ], { read: false })
        .pipe(clean());
});

gulp.task("min:client", function () {
    return gulp
        .src('./tmp/js/Client.js')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(concat('Client.bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/client'));
});

gulp.task("watch", function () {  
    var tsConfigFile = require("./src/client/tsconfig.json");
    gulp.watch(tsConfigFile.filesGlob, ["tsconfig-glob"]).on("change", reportChange);
});

// build Task
gulp.task('build:all', gulp.series('compile:all', 'min:client', 'copy:html'));