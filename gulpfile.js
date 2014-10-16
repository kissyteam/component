var gulp = require('gulp');
var filter = require('gulp-filter');
var kclean = require('gulp-kclean');
var modulex = require('gulp-modulex');
var path = require('path');
var rename = require('gulp-rename');
var packageInfo = require('./package.json');
var cwd = process.cwd();
var src = path.resolve(cwd, 'lib');
var build = path.resolve(cwd, 'build');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var jscs = require('gulp-jscs');
var replace = require('gulp-replace');
var gulpXTemplate = require('gulp-xtemplate');
var XTemplate = require('xtemplate');

gulp.task('lint', function () {
    return gulp.src(['./lib/**/*.js', '!./lib/**/xtpl/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'))
        .pipe(jscs());
});

gulp.task('clean', function () {
    return gulp.src(build, {
        read: false
    }).pipe(clean());
});

gulp.task('tag', function (done) {
    var cp = require('child_process');
    var version = packageInfo.version;
    cp.exec('git tag ' + version + ' | git push origin ' + version + ':' + version + ' | git push origin master:master', done);
});

var wrapper = require('gulp-wrapper');
var date = new Date();
var header = ['/*',
        'Copyright ' + date.getFullYear() + ', ' + packageInfo.name + '@' + packageInfo.version,
        packageInfo.license + ' Licensed',
        'build time: ' + (date.toGMTString()),
    '*/', ''].join('\n');
    
gulp.task('build', ['lint','xtpl'], function () {
    var mods = {
        'component/control': undefined,
        'component/container': ['component/control'],
        'component/extension/delegate-children': ['component/control'],
        'component/extension/shim': undefined,
        'component/extension/content-box': undefined,
        'component/extension/align': undefined,
        'component/plugin/drag': undefined,
        'component/plugin/resize': undefined
    };

    Object.keys(mods).forEach(function (tag) {
        var packages = {};
        packages[tag] = {
            base: path.resolve(src, tag)
        };
        var base = path.basename(tag);
        var dirname = path.dirname(tag);
        return gulp.src('./lib/' + tag + '.js')
            .pipe(modulex({
                modulex: {
                    packages: packages
                },
                excludeModules: mods[tag]
            }))
            .pipe(kclean({
                files: [
                    {
                        src: './lib/' + tag + '-debug.js',
                        outputModule: tag
                    }
                ]
            }))
            .pipe(replace(/@VERSION@/g, packageInfo.version))
            .pipe(wrapper({
                    header: header
                }))
            .pipe(gulp.dest(path.resolve(build,dirname)))
            .pipe(filter(base + '-debug.js'))
            .pipe(replace(/@DEBUG@/g, ''))
            .pipe(uglify())
            .pipe(rename(base + '.js'))
            .pipe(gulp.dest(path.resolve(build,dirname)));
    });
});

gulp.task('xtpl', function () {
    gulp.src('lib/**/*.xtpl').pipe(gulpXTemplate({
        wrap: false,
        runtime: 'xtemplate/runtime',
        suffix: '.xtpl',
        XTemplate: XTemplate
    })).pipe(gulp.dest('lib'))
});

gulp.task('mx', function () {
    var aggregateBower = require('aggregate-bower');
    aggregateBower('bower_components/', 'mx_modules/');
});

gulp.task('auto-d', function () {
    require('auto-deps')(cwd);
});

gulp.task('watch', function () {
    gulp.watch('lib/**/*.xtpl', ['xtpl']);
});

gulp.task('default', ['build']);