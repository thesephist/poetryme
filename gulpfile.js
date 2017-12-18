const gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

const paths = {
    libs: [
    ],
    scripts: [
        'static/js/utils.js',
        'static/js/main.js'
    ],
    styles: [
        'static/css/main.scss'
    ]
};

gulp.task('default', ['compile-styles', 'compile-scripts', 'compile-libs']);

gulp.task('compile-styles', function() {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./static/css'));
});

gulp.task('compile-scripts', function() {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['env', {
                    targets: {
                        browsers: [
                            'last 2 Chrome versions',
                            'last 2 Firefox versions',
                            'last 2 Edge versions',
                            'last 3 Safari versions',
                        ],
                    },
                }],
                ['minify'],
            ],
        }))
        .pipe(concat('./static/js/main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('compile-libs', function() {
    return gulp.src(paths.libs)
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['env', {
                    targets: {
                        browsers: [
                            'last 2 Chrome versions',
                            'last 2 Firefox versions',
                            'last 2 Edge versions',
                            'last 3 Safari versions',
                        ],
                    },
                }],
                ['minify'],
            ],
        }))
        .pipe(concat('./static/js/main.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('build', function() {
    // do build stuff
});
