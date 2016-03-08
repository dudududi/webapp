var gulp = require('gulp');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
//var env = process.env.GULP_ENV;


var path = {
    less: 'app/resources/css/**/*.less',
    js: 'app/resources/js/**/*.js',
    angularCore: 'app/controllers/**/*.js',
    angularCtrl: 'app/core/**/*.js',
    views:'app/views/**/*.html',
    styles:'app/resources/**/*.css'
};

gulp.task('js', function () {
    return gulp.src([path.js,path.angularCore,path.angularCtrl])
        //.pipe(concat('javascript.js'))
        //.pipe(gulpif(env === 'prod', uglify()))
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('public/js'));
});


gulp.task('less', function () {
    return gulp.src([path.less])
        .pipe(gulpif(/[.]less/, less()))
        .pipe(concat('styles.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app/resources/css'));
});

gulp.task('views', function () {
    return gulp.src([path.views])
        .pipe(gulp.dest('public/html'));
});

// gulp.task('img', function () {
//     return gulp.src('src/Acme/GarageBundle/Resources/public/images/**/*.*')
//         .pipe(gulp.dest('web/img'));
// });

// gulp.task('fonts', function () {
//     return gulp.src('bower_components/bootstrap/fonts/*.{eot,svg,ttf,woff,woff2}')
//         .pipe(gulp.dest('web/fonts/'));
// });

gulp.task('inject', function () {
    var target = gulp.src('app/index.html');
    var sources = gulp.src([path.js,path.angularCore,path.angularCtrl,path.styles], { read: false });

    target.pipe(inject(sources,{
        ignorePath: 'app/'
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('wiredep', function () {
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
gulp.task('default', ['wiredep','inject','less','views','js'], function(){

});
