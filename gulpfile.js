// To SASS converter install live-sass-compiler extension

const gulp = require("gulp");
const { src, series, parallel, dest, watch } = require("gulp");
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const minCSS = require("gulp-clean-css");

function copyHtml() {
  return src("src/*.html").pipe(gulp.dest("dist"));
}

function minify() {
  return src("src/*.js").pipe(uglify()).pipe(dest("dist"));
}

function minifyCss() {
  return src("src/css/*.css").pipe(minCSS()).pipe(dest("dist/css"));
}

function imageMin() {
  return src("src/img/*.*").pipe(imagemin()).pipe(dest("dist/img"));
}

function watchTask() {
  watch(
    "src",
    { interval: 1000 },
    parallel(copyHtml, minify, minifyCss, imageMin)
  );
}

exports.default = series(
  parallel(copyHtml, minify, minifyCss, imageMin),
  watchTask
);
