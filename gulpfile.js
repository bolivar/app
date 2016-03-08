//////////////////////////////////////////////////////
// Required
//////////////////////////////////////////////////////
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    plumber = require('gulp-plumber');
    autoprefixer = require('gulp-autoprefixer');
    // bower = require('gulp-bower');
    notify = require("gulp-notify") ,
    rename = require('gulp-rename');
    sass = require('gulp-ruby-sass');

var config = {
     sassPath: 'app/scss',
     bowerDir: 'bower_components' 
}


//////////////////////////////////////////////////////
// Scripts Task
//////////////////////////////////////////////////////
gulp.task('scripts', function(){
  gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
  .pipe(plumber())
  .pipe(rename({suffix:'.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(reload({stream:true}));
});

//////////////////////////////////////////////////////
// Sass Task
//////////////////////////////////////////////////////
gulp.task('css', function(){
  return sass(config.sassPath + '/style.sass', {
             style: 'compressed',
             loadPath: [
              'app/scss',
              config.bowerDir + '/bootstrap-sass/assets/stylesheets',
            ]
         }).on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             })) 
  .pipe(plumber())
  .pipe(autoprefixer('last 2 versions'))
  .pipe(gulp.dest('app/css'))
  .pipe(reload({stream:true}));
});


//////////////////////////////////////////////////////
// HTML Task
//////////////////////////////////////////////////////
gulp.task('html', function(){
  gulp.src('*.html')
  .pipe(reload({stream:true}));
});

//////////////////////////////////////////////////////
// BrowserSync Task
//////////////////////////////////////////////////////
gulp.task('browser-sync', function(){
  browserSync({
    server:{
      baseDir: "../app"
    }
  })
});


//////////////////////////////////////////////////////
// Watch Task
//////////////////////////////////////////////////////
gulp.task('watch', function(){
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/scss/**/*.sass', ['css']);
  gulp.watch('*.html', ['html']);
});


//////////////////////////////////////////////////////
// Default Task
//////////////////////////////////////////////////////
gulp.task('default', ['scripts', 'css', 'html', 'browser-sync', 'watch']);
