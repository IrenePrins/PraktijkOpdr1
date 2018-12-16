var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');
    gulpMocha = require('gulp-mocha');



gulp.task('default', function(){
    nodemon({
        script : 'app.js',
        ext : 'js',
        env :{
            PORT: 8800
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('We have started')
    })
});

// gulp.task('test', function(){
//     gulp.src('Tests/*.js', {read: false})
//         .pipe(gulpMocha({reporter: 'nyan'}))
// })