// ////////////////////////////////////////////////
//
// EDIT CONFIG OBJECT BELOW !!!
//
// jsConcatFiles => list of javascript files (in order) to concatenate
// buildFilesFoldersRemove => list of files to remove when running final build
// // /////////////////////////////////////////////

var config = {
    jsConcatFiles: [
        './js/!(*.min.js)'
    ],
    buildFilesFoldersRemove:[
        'build/scss/',
        'build/js/!(*.min.js)',
        'build/bower.json',
        'build/bower_components/',
        'build/maps/'
    ]
};


// ////////////////////////////////////////////////
// Required taskes
// gulp build
// bulp build:serve
// // /////////////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;
    //concat = require('gulp-concat'),
    //uglify = require('gulp-uglify'),
    //rename = require('gulp-rename'),
    //del = require('del');


// ////////////////////////////////////////////////
// Log Errors
// // /////////////////////////////////////////////

function errorlog(err){
    console.log(err.message);
    this.emit('end');
}


// ////////////////////////////////////////////////
// Scripts Tasks
// ///////////////////////////////////////////////

gulp.task('scripts', function() {
    return gulp.src(config.jsConcatFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('temp.js'))
        .pipe(uglify())
        .on('error', errorlog)
        .pipe(rename('.min.js'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./js/'))

        .pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Styles Tasks
// ///////////////////////////////////////////////

gulp.task('styles', function() {
    gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded'}))
        .on('error', errorlog)
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css'))
        .pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// HTML Tasks
// // /////////////////////////////////////////////

gulp.task('html', function(){
    gulp.src('./**/*.html')
        .pipe(reload({stream:true}));
});

// ////////////////////////////////////////////////
// PHP Tasks
// // /////////////////////////////////////////////

gulp.task('php', function(){
    gulp.src('./**/*.php')
        .pipe(reload({stream:true}));
});


// ////////////////////////////////////////////////
// Browser-Sync Tasks
// // /////////////////////////////////////////////

gulp.task('browser-sync', function() {
    browserSync({
        // server: {
        //    baseDir: "./"
        // }
        proxy: "http://localhost/api/rounter"
    });
});




// ////////////////////////////////////////////////
// Watch Tasks
// // /////////////////////////////////////////////

gulp.task ('watch', function(){
    gulp.watch('./scss/**/*.scss', ['styles']);
    //gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch(['./bwsrount/*.php', '*.php'] , ['php']);
});


gulp.task('default', ['styles', 'php', 'browser-sync', 'watch']);