const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const plumber = require("gulp-plumber");
const del = require("del");
const htmlreplace = require("gulp-html-replace");
const htmlMin = require("gulp-htmlmin");
const babel = require("gulp-babel");
const imageMin = require("gulp-imagemin");



// Compiles SCSS files from /scss into /css
gulp.task("sass", function () {
    gulp.src("src/scss/styles.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest("src/build/css"))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task("babel", () => {
    gulp.src("src/js/*.js")
        .pipe(plumber())
        //.pipe(babel({presets: ["env"]}))
        .pipe(gulp.dest("src/build/js"));
});

// Minify compiled CSS
gulp.task("minify-css", ["sass"], function () {
    gulp.src("src/build/css/*.css")
        .pipe(cleanCSS({
            compatibility: "ie8"
        }))
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/css"));
});

// Minify custom JS
gulp.task("minify-js", function () {
    gulp.src("src/build/js/*.js")
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist/js"));
});

// Copy vendor files from /node_modules into /dist
// NOTE: requires `npm install` before running!
gulp.task("copy", function () {

    gulp.src(["node_modules/flexboxgrid/dist/flexboxgrid.css"])
        .pipe(gulp.dest("src/build/css"));

});

// Default task
gulp.task("default", ["build", "minify", "copy"]);

gulp.task("minify", ["minify-css", "minify-js", "html", "image"]);
gulp.task("build", ["sass", "babel", "image"]);

// Configure the browserSync task
gulp.task("browserSync", function () {
    browserSync.init({
        server: {
            baseDir: "src/."
        },
    });
});

// Dev task with browserSync
gulp.task("dev", ["copy","build", "browserSync"], function () {
    gulp.watch("src/scss/**/*.scss", ["sass"]);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch("src/*.html", browserSync.reload);
    gulp.watch("src/js/**/*.js",["babel", browserSync.reload]);
});

gulp.task("del", (done) => {
    del(["index.html", "src/build", "dist"])
        .then(() => {
            return done();
        });
});

gulp.task("html", () => {
    gulp.src("src/index.html")
        .pipe(htmlreplace({
            "css": ["dist/css/styles.min.css", "dist/css/flexboxgrid.min.css"],
            "js": "dist/js/main.min.js",
        }))
        .pipe(htmlMin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest("./"));
});


gulp.task("image", () => {
    gulp.src("src/images/*.*")
        //.pipe(imageMin())
        .pipe(gulp.dest("src/build/images"))
        .pipe(gulp.dest("./dist/images/"));
});