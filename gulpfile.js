/* File: gulpfile.js */

const gulp         = require('gulp')
const gutil        = require('gulp-util')
const sass         = require('gulp-sass')
const browserSync  = require('browser-sync').create();
const babel        = require('gulp-babel')

gulp.task('serve', ['sass'], () => {

    browserSync.init({
        server: '.',
        port: 3005
    })

    gulp.watch('./stylesheets/scss/*.scss', ['sass'])
    gulp.watch(['app/**/*.html']).on('change', browserSync.reload)
    gulp.watch('app/**/*.js', ['babel']).on('change', browserSync.reload)
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () => {
    return gulp.src("./stylesheets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./stylesheets/css"))
        .pipe(browserSync.stream())
    })

gulp.task('babel', () => {
    return gulp.src('app/**/*.js')
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(gulp.dest('build'))
})

gulp.task('default', ['serve'])
