var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var config = {
  bowerDir: './bower_components'
}

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 config.bowerDir + '/bootstrap/assets/stylesheets',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css')); 
});

gulp.task('sass', function() {
  return sass('app/scss/styles.sass')
    .pipe(gulp.dest('app/css'))
    .pipe(reload({ stream:true }));
});

// watch Sass files for changes, run the Sass preprocessor with the 'sass' task and reload
gulp.task('serve', ['sass'], function() {
  browserSync({
    server: {
      baseDir: '../app'
    }
  });

  gulp.watch('app/scss/**/*', ['sass']);
  gulp.watch('*.html');
});
