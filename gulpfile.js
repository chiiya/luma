const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const sassLint = require('gulp-sass-lint');
const eslint = require('gulp-eslint');
const cleanCSS = require('gulp-clean-css');

const paths = {
  src: './src',
  build: './dist',
};
const config = {
  projectName: 'luma',
  uglify: {
    src: `${paths.src}/js/*.js`,
    dest: paths.build,
    options: {},
  },
  browserify: {
    entries: [`${paths.src}/js/index.js`],
  },
  babelify: {
    presets: ['es2015'],
  },
  sass: `${paths.src}/scss/**/*.scss`,
  sass_exclude: `!${paths.src}/scss/base/_normalize.scss, !${paths.src}/vendor/*.scss`,
  scripts: `${paths.src}/js/*.js`,
};


/**
 * Run all tasks needed for a build.
 */
gulp.task('build', ['sass', 'scripts']);

/**
 * Default task. Run the watch task
 */
gulp.task('default', ['watch']);

/**
 * Run the serve task and then start watching for changes.
 */
gulp.task('watch', ['build'], () => {
  gulp.watch(config.sass, ['sass']);
  gulp.watch(config.scripts, ['scripts']);
});

/**
 * Compile Sass, run autoprefixer and minify the outcome.
 */
gulp.task('sass', ['sass:lint'], () => {
  return gulp.src(`${paths.src}/scss/*.scss`)
    .pipe(sass())
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(rename(`${config.projectName}.min.css`))
    .pipe(gulp.dest(paths.build));
});

/**
 * Lint SCSS files
 */
gulp.task('sass:lint', () => {
  return gulp.src([config.sass, config.sass_exclude])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

/**
 * Compile ES6 Javascript and bundle it together.
 */
gulp.task('scripts', ['scripts:lint'], () => {
  return browserify(config.browserify)
    .transform(babelify.configure(config.babelify))
    .bundle()
    .pipe(source(`${config.projectName}.min.js`))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.build));
});

/**
 * Lint Javascript files with ESLint
 */
gulp.task('scripts:lint', () => {
  return gulp.src([config.scripts, `!${config.scripts}/vendor`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

