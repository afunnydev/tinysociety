const gulp = require('gulp');
const imagemin = require("gulp-imagemin");
const sharp = require('sharp');
const through2 = require('through2');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const newer = require('gulp-newer');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const terser = require('gulp-terser');
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
                  'themes/tinysociety/assets/js/theme/animations.js',
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
                  'themes/tinysociety/assets/js/theme/animations.js',
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
                  'themes/tinysociety/assets/js/theme/animations.js',
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
                  'themes/tinysociety/assets/js/theme/animations.js',
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

// Helper function for resizing images with sharp to multiple sizes
function resizeMultiple(sizes) {
  return through2.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new Error('Streaming not supported'));
    }
    
    const ext = path.extname(file.path).toLowerCase();
    
    // Skip if not an image we can process
    if (!['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
      return cb(null, file);
    }
    
    const basename = path.basename(file.path);
    const sourceStats = fs.statSync(file.path);
    
    // Check if all output files exist and are newer than source
    const allExist = sizes.every(({ dest }) => {
      const outputPath = path.join(dest, basename);
      if (!fs.existsSync(outputPath)) return false;
      const destStats = fs.statSync(outputPath);
      return destStats.mtime >= sourceStats.mtime;
    });
    
    if (allExist) {
      return cb(null, file);
    }
    
    // Process all sizes for this image
    const promises = sizes.map(({ width, dest }) => {
      const outputPath = path.join(dest, basename);
      return sharp(file.path)
        .resize(width, null, { fit: 'inside', withoutEnlargement: true })
        .toFile(outputPath);
    });
    
    Promise.all(promises)
      .then(() => {
        console.log(`Processed: ${basename}`);
        cb(null, file);
      })
      .catch(err => {
        console.error(`Error processing ${file.path}:`, err.message);
        cb(null, file);
      });
  });
}

 
// resize and optimize images
gulp.task("image-resize", () => {
  const sizes = [
    { width: imagexl, dest: "themes/tinysociety/static/xl/img" },
    { width: imagefull, dest: "themes/tinysociety/static/img" },
    { width: imagehalf, dest: "themes/tinysociety/static/half/img" },
    { width: imagequart, dest: "themes/tinysociety/static/quart/img" },
    { width: imagethumb, dest: "themes/tinysociety/static/thumb/img" },
    { width: imageload, dest: "themes/tinysociety/static/load/img" }
  ];

  return gulp.src("themes/tinysociety/source-images/*.{jpg,png,jpeg,JPG,gif}")
    .pipe(resizeMultiple(sizes));
});

// hugo production call
gulp.task("hugo", async () => {
  try {
    const { stdout, stderr } = await execAsync('hugo --cleanDestinationDir');
    console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error('Hugo build failed:', error);
    throw error;
  }
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
        .pipe(terser())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-ui', () => {
    return gulp.src(jsFilesUI)
        .pipe(sourcemaps.init())
        .pipe(concat('main-with-ui.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-plans', () => {
    return gulp.src(jsFilesPlans)
        .pipe(sourcemaps.init())
        .pipe(concat('main-plans.min.js'))
        .pipe(terser())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(jsDest));
});

gulp.task('scripts-maps', () => {
    return gulp.src(jsFilesMaps)
        .pipe(sourcemaps.init())
        .pipe(concat('main-maps.min.js'))
        .pipe(terser())
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
