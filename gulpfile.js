var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');

var path = {
    less: 'app/resources/css/**/*.less',
    js: 'app/resources/js/**/*.js',
    angularCore: 'app/angularCore/**/*.js',
    angularCtrl: 'app/controllers/**/*.js',
    views:'app/views/**/*.html',
    styles:'app/resources/**/*.css',
    mainApp:'app/mainApp.js'
};

gulp.task('compileLess', function () {
    return gulp.src([path.less])
        .pipe(gulpif(/[.]less/, less()))
        .pipe(gulp.dest('app/resources/css'));
});

gulp.task('injectAllFiles',['compileLess'], function () {
    var target = gulp.src('app/index.html');
    var sources = gulp.src([path.mainApp,path.js,path.angularCore,path.angularCtrl,path.styles]);
    target.pipe(inject(sources,{
        ignorePath: 'app/'
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('wiredepBowerFiles', function () {
    gulp.src('app/index.html')
        .pipe(wiredep({
            directory: './bower_components/',
            ignorePath: '../../',
            fileTypes: {
                html: {
                    replace: {
                        js: '<script src="{{filePath}}"></script>',
                        css: '<link rel="stylesheet" href="{{filePath}}"/>'
                    }
                }
            }
        }))
        .pipe(gulp.dest('app/'));
});

// gulp.task('watch', function () {
//     gulp.watch(paths.less, ['less']);
//     gulp.watch(paths.js, ['js']);
//     gulp.watch(paths.angularApp, ['js']);
//     gulp.watch(paths.angularCtrl, ['js']);
//     gulp.watch(paths.html, ['html']);
// });

//define executable tasks when running "gulp" command
gulp.task('default', ['wiredepBowerFiles','injectAllFiles'], function(){

});
