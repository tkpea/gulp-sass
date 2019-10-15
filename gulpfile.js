const settings = {
  src: "./assets/scss/**/*.scss",
  dest: "./",
  map: "./assets/scss/maps",
  outputStyle : "nested" // nested expanded compact compressed
}
const gulp = require("gulp");
const sass = require("gulp-sass");
// 下層フォルダをまとめて読み込む
const sassGlob = require("gulp-sass-glob"); 
// DeveloperTool用のMapを出力する
const sourcemaps = require("gulp-sourcemaps");  
 // プレフィックを自動で挿入する
const autoprefixer = require('gulp-autoprefixer'); 
// node_modulesのscssをインポートできるようにする　例:`@import ~normalize`
const packageImporter = require('node-sass-package-importer');　
gulp.task("default", function() {
  return gulp.watch(settings.src, function() {
    return (
      gulp
        .src(settings.src)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
          cascade: false
        }))   
        .pipe(sassGlob())          
        .pipe(
          sass({
           outputStyle: settings.outputStyle,
           importer: packageImporter({
            extensions: ['.scss', '.css']
            })         
          })
          .on("error", sass.logError)
        )
        .pipe(sourcemaps.write(settings.map)) 
        .pipe(gulp.dest(settings.dest))
    );
  });
});