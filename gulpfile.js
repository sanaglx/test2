var gulp        = require('gulp'),
	sass         = require('gulp-sass'), //Подключаем Sass пакет,
	browserSync  = require('browser-sync'),// Подключаем Browser Sync
	concat       = require('gulp-concat'),// Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
//	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
//	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
//	cache        = require('gulp-cache'); // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


gulp.task('sass',function(){
	return gulp.src('app/sass/*.+(scss|sass)')
	.pipe(sass())
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function() {
	return gulp.src([
			'app/libs/jquery/dist/jquery.min.js',
			'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		])
	.pipe(concat('lib.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'));
});

gulp.task('css-libs',['sass'], function() {
	return gulp.src('app/css/lib.css')
	.pipe(cssnano())
	.pipe(rename({suffix:'.min'}))
	.pipe(gulp.dest('app/css'));
});

gulp.task('browser-sync',function (){
	browserSync({
		server:{
			baseDir: 'app'
		},
		notify:false
	})
});

gulp.task('clean',function(){
	return del.sync('dist');
});

//чистка кеша
gulp.task('clear',function(){
	return cache.clearAll('dist');
});

gulp.task('img',function(){
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgPlugins:[{removeViewBox: false}],
		une:[pngquant()]
	})))
	.pipe(gulp.dest('dist/img'));
});


gulp.task('watch',['browser-sync','css-libs','scripts'],function (){
	gulp.watch('app/sass/*.+(scss|sass)',['sass']);
	gulp.watch('app/*.html',browserSync.reload);
	gulp.watch('app/js/**/*.js',browserSync.reload);

});

gulp.task('build',['clean','img','sass','scripts'], function(){

	var buildCss = gulp.src([
		'app/css/main.css',
		'app/css/lib.min.css',
		])
	.pipe(gulp.dest('dist/css'));

	var buildFonts = gulp.src('app/font/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
});