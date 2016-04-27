//dependencies
var gulp = require('gulp');
var util = require('gulp-util');
var SystemBuilder = require('systemjs-builder');
var watch = require('gulp-watch');
var ts = require('gulp-typescript');
var tsConfig = require('./tsconfig.json');
var connect = require('gulp-connect');
var del = require('del');
var ftp = require('vinyl-ftp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

//Typescript Config;
var tsProject = ts.createProject(tsConfig.compilerOptions);


gulp.task('deploy', ['clean', 'copy:deps', 'copy:src', 'compile:scss', 'compile:app'], function () {
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

//copy dependencies to dist folder
gulp.task('copy:deps', function(){
  return gulp.src([
    'node_modules/angular2/bundles/angular2-polyfills.js',
    'node_modules/angular2/bundles/angular2.dev.js',
    'node_modules/angular2/bundles/http.js',
    'node_modules/angular2/bundles/router.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/systemjs/dist/system.js',
  ]).pipe(gulp.dest('dist/vendor'));
});

//copy html/css/js files
gulp.task('copy:src', function(){
  return gulp.src([
    './src/index.html',
    './src/robots.txt',
    './src/fonts/**/*',
    './src/images/**/*',
    './src/templates/**/*'
  ], {
    base: './src'
  })
  .pipe(gulp.dest('dist'))
  .pipe(connect.reload());
});

//clean the dist folder
gulp.task('clean', function(){
  return del.sync(['./dist/**/*']);
});

//compile app typescript files
gulp.task('compile:app', function(){
  return gulp.src('./src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
});


//compile sass to css
gulp.task('compile:scss', function () {
  return gulp.src([
      './src/**/*.scss'
    ], {
      base: "./src/scss"
    })
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: "compressed"
    }).on('error', sass.logError))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./dist/css'))
});

//live reload server
gulp.task('server', ['copy:deps', 'copy:src', 'compile:scss', 'compile:app'], function() {
  connect.server({
    port: '3000',
    root: 'dist',
    livereload: true
  });
});

//default task
gulp.task('default', ['clean', 'server'], function(){
  gulp.watch(['./src/**/*.ts'], ['compile:app']);
  gulp.watch(['./src/**/*.scss'], ['compile:scss']);
  gulp.watch(['./src/**/*.html'], ['copy:src']);
});
