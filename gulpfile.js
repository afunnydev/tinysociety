const gulp = require('gulp');
const imagemin = require("gulp-imagemin");
const imageresize = require('gulp-image-resize');
var exec = require('child_process').exec;
var newer = require('gulp-newer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify-es').default;
// var browserSync = require('browser-sync').create();

// image resizing variables
const imagexl = 2620;
const imagefull = 1920;
const imagehalf = 1024;
const imagequart = 600;
const imagethumb = 80;
const imageload = 20;
const jsFiles = [
                  'themes/tinysociety/assets/js/theme/jquery-2.1.4.min.js',
                  'themes/tinysociety/assets/js/theme/mfn.menu.js',
                  'themes/tinysociety/assets/js/theme/jquery.plugins.js',
                  'themes/tinysociety/assets/js/theme/jquery.jplayer.min.js',
                  'themes/tinysociety/assets/js/theme/animations/animations.js',
                  'themes/tinysociety/assets/js/theme/email.js',
                  'themes/tinysociety/assets/js/theme/scripts.js',
                  'themes/tinysociety/assets/js/vendor/instafeed.min.js',
                  'themes/tinysociety/assets/js/vendor/lazyload.js',
                  'themes/tinysociety/assets/js/vendor/jquery.sticky-sidebar.js',
                  'themes/tinysociety/assets/js/vendor/popper.min.js',
                  'themes/tinysociety/assets/js/vendor/bootstrap.js',
                  'themes/tinysociety/assets/js/vendor/bites.js',
                  'themes/tinysociety/assets/js/main.js'
                ];
const jsFilesMaps = [
                  'themes/tinysociety/assets/js/theme/jquery-2.1.4.min.js',
                  'themes/tinysociety/assets/js/theme/mfn.menu.js',
                  'themes/tinysociety/assets/js/theme/jquery.plugins.js',
                  'themes/tinysociety/assets/js/theme/jquery.jplayer.min.js',
                  'themes/tinysociety/assets/js/theme/animations/animations.js',
                  'themes/tinysociety/assets/js/theme/email.js',
                  'themes/tinysociety/assets/js/theme/scripts.js',
                  'themes/tinysociety/assets/js/vendor/instafeed.min.js',
                  'themes/tinysociety/assets/js/vendor/lazyload.js',
                  'themes/tinysociety/assets/js/vendor/jquery.sticky-sidebar.js',
                  'themes/tinysociety/assets/js/datamaps/topojson.js',
                  'themes/tinysociety/assets/js/datamaps/datamaps.usa.js',
                  'themes/tinysociety/assets/js/vendor/popper.min.js',
                  'themes/tinysociety/assets/js/vendor/bootstrap.js',
                  'themes/tinysociety/assets/js/vendor/bites.js',
                  'themes/tinysociety/assets/js/main.js',
                ];
const jsFilesPlans = [
                  'themes/tinysociety/assets/js/theme/jquery-2.1.4.min.js',
                  'themes/tinysociety/assets/js/theme/mfn.menu.js',
                  'themes/tinysociety/assets/js/theme/jquery.plugins.js',
                  'themes/tinysociety/assets/js/theme/jquery.jplayer.min.js',
                  'themes/tinysociety/assets/js/theme/animations/animations.js',
                  'themes/tinysociety/assets/js/theme/email.js',
                  'themes/tinysociety/assets/js/theme/scripts.js',
                  'themes/tinysociety/assets/js/vendor/instafeed.min.js',
                  'themes/tinysociety/assets/js/vendor/lazyload.js',
                  'themes/tinysociety/assets/js/vendor/jquery.sticky-sidebar.js',
                  'themes/tinysociety/assets/js/vendor/selectem.js',
                  'themes/tinysociety/assets/js/theme/ui/jquery-ui-slider.js',
                  'themes/tinysociety/assets/js/vendor/jquery-ui-slider-pips.js',
                  'themes/tinysociety/assets/js/vendor/twemoji.js',
                  'themes/tinysociety/assets/js/vendor/popper.min.js',
                  'themes/tinysociety/assets/js/vendor/bootstrap.js',
                  'themes/tinysociety/assets/js/vendor/bites.js',
                  'themes/tinysociety/assets/js/main.js'
                ];
const jsFilesUI = [
                  'themes/tinysociety/assets/js/theme/jquery-2.1.4.min.js',
                  'themes/tinysociety/assets/js/theme/ui/jquery.ui.core.js',
                  'themes/tinysociety/assets/js/theme/ui/jquery.ui.widget.js',
                  'themes/tinysociety/assets/js/theme/ui/jquery.ui.accordion.js',
                  'themes/tinysociety/assets/js/theme/ui/jquery.ui.tabs.js',
                  'themes/tinysociety/assets/js/theme/mfn.menu.js',
                  'themes/tinysociety/assets/js/theme/jquery.plugins.js',
                  'themes/tinysociety/assets/js/theme/jquery.jplayer.min.js',
                  'themes/tinysociety/assets/js/theme/animations/animations.js',
                  'themes/tinysociety/assets/js/theme/email.js',
                  'themes/tinysociety/assets/js/theme/scripts.js',
                  'themes/tinysociety/assets/js/vendor/instafeed.min.js',
                  'themes/tinysociety/assets/js/vendor/lazyload.js',
                  'themes/tinysociety/assets/js/vendor/jquery.sticky-sidebar.js',
                  'themes/tinysociety/assets/js/vendor/popper.min.js',
                  'themes/tinysociety/assets/js/vendor/bootstrap.js',
                  'themes/tinysociety/assets/js/vendor/bites.js',
                  'themes/tinysociety/assets/js/main.js'
                ];
const jsDest = 'themes/tinysociety/static/js';

 
// resize and optimize images
gulp.task("image-resize", () => {
  return gulp.src("themes/tinysociety/source-images/*.{jpg,png,jpeg,JPG,gif}")
    .pipe(newer("themes/tinysociety/static/img"))
    .pipe(imagemin([
        imagemin.gifsicle({interlaced: true}),
        imagemin.jpegtran({progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
      ]))
    .pipe(imageresize({ width: imagexl}))
    .pipe(gulp.dest("themes/tinysociety/static/xl/img"))
    .pipe(imageresize({ width: imagefull }))
    .pipe(gulp.dest("themes/tinysociety/static/img"))
    .pipe(imageresize({ width: imagehalf }))
    .pipe(gulp.dest("themes/tinysociety/static/half/img"))
    .pipe(imageresize({ width: imagequart }))
    .pipe(gulp.dest("themes/tinysociety/static/quart/img"))
    .pipe(imageresize({ width: imagethumb }))
    .pipe(gulp.dest("themes/tinysociety/static/thumb/img"))
    .pipe(imageresize({ width: imageload }))
    .pipe(gulp.dest("themes/tinysociety/static/load/img"));
});

// hugo production call
gulp.task("hugo", (cb) => {
  exec('hugo --cleanDestinationDir', (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('sass', () => {
  return gulp.src('themes/tinysociety/assets/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('themes/tinysociety/static/css'));
});

gulp.task('sass-admin', () => {
  return gulp.src('themes/tinysociety/assets/scss/admin.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('admin.min.css'))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('themes/tinysociety/static/css'));
});

gulp.task('scripts-normal', () => {
    return gulp.src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-ui', () => {
    return gulp.src(jsFilesUI)
        .pipe(sourcemaps.init())
        .pipe(concat('main-with-ui.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-plans', () => {
    return gulp.src(jsFilesPlans)
        .pipe(sourcemaps.init())
        .pipe(concat('main-plans.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-maps', () => {
    return gulp.src(jsFilesMaps)
        .pipe(sourcemaps.init())
        .pipe(concat('main-maps.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts', gulp.series('scripts-normal', 'scripts-ui', 'scripts-plans', 'scripts-maps'));

// watching
gulp.task("watch", function() {

  // browserSync.init({
  //     proxy: "http://localhost:1313/"
  // });

  gulp.watch('themes/tinysociety/source-images/*.{jpg,png,jpeg,JPG,gif}', gulp.series('image-resize') );
  gulp.watch('themes/tinysociety/assets/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('themes/tinysociety/assets/js/**/*.js', gulp.series('scripts'));
});

// watching images and resizing
gulp.task("dev", gulp.series('image-resize', 'watch'));

// optimizing images and calling hugo for production
gulp.task("prod", gulp.series('image-resize', 'hugo'));
