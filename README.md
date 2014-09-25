# gulp-trycatch-closure

Enclose JS files content with a "try ... catch" statement.

It allows to easily catch errors on development.

## Install

Install `gulp-trycatch-closure` using NPM, as a development dependency:

```shell
npm install --save-dev gulp-trycatch-closure
```

## Usage

```js
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    trycatch = require('gulp-trycatch-closure');

gulp.task('build', function() {
    // Get all JS files
    return gulp.src(['src/js/*.js'])
        // Enclose their content with a try ... catch statement
        .pipe(trycatch())
        // Concat
        .pipe(concat('build.js'))
        // Send to destination
        .pipe(gulp.dest('dist/'));
});
```

## Usage with gulp-if

```
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    ifif = require('gulp-if'),
    trycatch = require('gulp-trycatch-closure'),

    // Check if we're in dev env
    isDev = process.NODE_ENV !== 'production';

gulp.task('build', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(ifif(isDev, trycatch()))
        .pipe(concat('build.js'))
        .pipe(gulp.dest('dist/'));
});
```

## Change the way to log errors

You can pass to the `trycatch` function an object of options. Here are the available options with their default value:

* `logger` - Way to log the error, default is `console.warn(e);`

## Example of resulting build file:

```js
try {
  
    /* file content */

} catch (e) {
    console.warn(e);
}
```
