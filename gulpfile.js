const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const ftp = require('vinyl-ftp');

gulp.task('deploy', ['build'], function () {
    var username = process.argv[4],
        password = process.argv[6];

    console.log("USERNAME: " + username);
    console.log("PASSWORD: " + password);

    var conn = ftp.create( {
        host:     'jonathanadamski.com',
        user:     username,
        password: password,
        parallel: 4
    } );

    var globs = [
        'dist/**/*'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src( globs, { base: 'dist', buffer: false } )
        .pipe( conn.newer( '/public_html/storybook' ) ) // only upload newer files
        .pipe( conn.dest( '/public_html/storybook' ) );
});

// clean the contents of the distribution directory
gulp.task('clean', function () {
  return del('dist/**/*');
});

// TypeScript compile
gulp.task('compile', ['clean'], function () {
  return gulp
    .src('_src/typescript/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'));
});

// copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function() {
  return gulp.src(['index.html', 'robots.txt', 'css/**/*', 'fonts/**/*', 'images/**/*', 'templates/**/*.html'], { base : './' })
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['compile', 'copy:assets']);
gulp.task('publish', ['build', 'deploy']);
gulp.task('default', ['build']);