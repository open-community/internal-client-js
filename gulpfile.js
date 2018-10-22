/* eslint-disable import/no-extraneous-dependencies */
// ============================================================
// Import packages
const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

const sourcemaps = require('gulp-sourcemaps');

// ============================================================
// Module's constants and variables
const DIST_DIRECTORY = './dist';

// ============================================================
// Simple tasks

// ==============================
// Clean
gulp.task('clean:build', () => del([
    DIST_DIRECTORY,
]));

// ==============================
// Convert

gulp.task('convert:javascript', () => gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')));

gulp.task('convert:javascript:no-tests', () => gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist')));

// ============================================================
// Composed tasks
gulp.task(
    'build',
    gulp.series(
        'clean:build',
        'convert:javascript:no-tests',
    ),
);

gulp.task(
    'build',
    gulp.series(
        'clean:build',
        'convert:javascript:no-tests',
    ),
);
