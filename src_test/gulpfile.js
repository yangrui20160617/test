function creatPath(dist) {
    return {
        data: {
            "static_img":"../res/img",
            "static_css":'../res/css',
            "static_js":'../js',
            "version": (new Date()).getTime()
        },
        "jade": {
            "src": ["jade/**/*.jade","!jade/**/demo.jade"],
            "srcj": "jade/**/*.jade",
            "dist": "./../code/html",
            "build":"/Users/yangrui/desktop/work/fe.m.dishifenqi.com/fe.m.dishifenqi.com/templates_test/",
            "root":"./../"
        },
        "css": {
            "src": ["scss/**/*.scss","!scss/**/demo.scss"],
            "dist": "./../code/res/css",
            "build" : "/Users/yangrui/desktop/work/s.dishifenqi.com/taxi_test/css"
        },
        "img": {
            "src": "img/*.*",
            "dist": "./../code/res/img",
            "build" : "/Users/yangrui/desktop/work/s.dishifenqi.com/taxi_test/img"
        },
        "js": {
            "src": "js/*.js",
            "dist": "./../code/js",
            "build" : "/Users/yangrui/desktop/work/s.dishifenqi.com/taxi_test/js"
        },
        "json": {
            "src": "json/*.json",
            "dist": "./../static_test/json",
            "build" : "/Users/yangrui/desktop/work/s.dishifenqi.com/taxi_test/json"
        },
        "watch": './../**/*',
        "port": 3009,
        "host": "127.0.0.1"
    }
}

var config = creatPath('dist')
var opn = require('opn')
var sass = require('gulp-sass')
var gulp = require('gulp')
var jade = require('gulp-jade')
var uglify = require('gulp-uglify')
var base64 = require('gulp-base64')
var connect = require('gulp-connect')
var plumber = require('gulp-plumber')
var changed = require('gulp-changed')
var replace = require('gulp-replace')
var imports = require('gulp-imports')
var browserify = require('gulp-browserify')


gulp.task('jade', function() {
    gulp.src(config.jade.src)
        .pipe(plumber())
        .pipe(jade({
            pretty: true,
            data: config.data
        }))
        .pipe(replace(/&lt;/g, "<"))
        .pipe(replace(/&gt;/g, ">"))
        .pipe(changed(config.jade.dist))
        .pipe(gulp.dest(config.jade.dist))
})

gulp.task('css', function() {
    gulp.src(config.css.src)
        .pipe(plumber())
        .pipe(replace('.jpg', '.jpg?__t=' + config.data.version))
        .pipe(replace('.png', '.png?__t=' + config.data.version))
        .pipe(sass())
        .pipe(changed(config.css.dist))
        .pipe(gulp.dest(config.css.dist))
})
gulp.task('img', function() {
    gulp.src(config.img.src)
        .pipe(plumber())
        .pipe(changed(config.img.dist))
        .pipe(gulp.dest(config.img.dist))
})
gulp.task('js', function() {
    gulp.src(config.js.src)
        .pipe(plumber())
        .pipe(imports())
        .pipe(changed(config.js.dist))
        .pipe(gulp.dest(config.js.dist))
        .pipe(gulp.dest(config.js.build))

})
gulp.task('connect', function() {
    connect.server({
        root: config.jade.root,
        livereload: true,
        port: config.port,
        host: config.host
    })
    opn('http://' + config.host + ':' + config.port)
})

gulp.task('watch', function() {
    gulp.watch(config.jade.src, ['jade'])
    gulp.watch(config.css.src, ['css'])
    gulp.watch(config.img.src, ['img'])
    gulp.watch(config.js.src, ['js'])
})

gulp.task('creat', function() {
    gulp.start(['jade','css','watch','img', 'js'])
})

gulp.task('default', ['creat'], function() {
    gulp.start('connect')
    gulp.watch(config.watch, function() {
        gulp.src(config.watch)
            .pipe(connect.reload())
    })
})

gulp.task('release', function(a, b, c) {
    var date = new Date()
    config = creatPath([date.getFullYear(), date.getMonth() + 1, date.getDate()].join(''))
    gulp.start('creat')
})
