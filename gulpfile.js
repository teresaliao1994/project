//Connect the gulp modules
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// Connection order of the sass/scss-files
const cssFiles = [
   //'./src/css/style.sass',
   './src/css/*sass',
   './src/css/*scss'
];

//Task for CSS styles
function styles() {
   return gulp.src(cssFiles)
      .pipe(sass())
      //Add prefixes
      .pipe(autoprefixer())
      //CSS minification
      .pipe(cleanCSS({
         level: 2
      }))
      //Output folder for styles
      .pipe(gulp.dest('./src/css'))
      .pipe(browserSync.stream());
}


//Watch files
function watch() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
   //Watch CSS files
   gulp.watch('./src/css/**/*.sass', styles);
   gulp.watch('./src/css/**/*.scss', styles);
   //Start synchronization after HTML changing
   gulp.watch("./*.html").on('change', browserSync.reload);
}

//Task calling 'styles' function
gulp.task('styles', styles);
//Task for changes tracking
gulp.task('watch', watch);
//Task for cleaning the 'build' folder and running 'styles
gulp.task('build', gulp.series(gulp.parallel(styles)));
//Task launches build and watch task sequentially
gulp.task('dev', gulp.series('build','watch'));
//Default task
gulp.task('default', gulp.series('build','watch'));