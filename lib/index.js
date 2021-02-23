/*
 * @Author: your name
 * @Date: 2020-11-23 09:49:34
 * @LastEditTime: 2020-11-30 19:27:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \gulps\lib\index.js
 */
const GulpClient = require("gulp")
const { src, dest, series, parallel, watch } = require("gulp")
const fs = require('fs');
const { Transform } = require('stream');
const del = require("del")
const browser = require("browser-sync")
const bs = browser.create();
const loadplumin = require("gulp-load-plugins");
const load = loadplumin();

// 获取配置数据
const path = process.cwd();

let data = {
    build: {
        src: 'src',
        dist: 'dist',
        temp: 'temp',
        public: 'public',
        paths: {
            sass: 'sass/*.scss',
            script: '**.js',
            html: '**.html',
            image: 'sass/*.scss',
            font: '',
        }
    }
};

try {
    let data = Object({}, data, require(`${path}/page.config.js`))
} catch(e) {}

exports.foo = done => {
    console.log(12345)
    done()
}
// 4.0以前的老版本。
// GulpClient.task('aaa', done=>{
//     console.log(1234)
//     done()
// })

// 4.0以前的老版本。
const task1 = done => {
    setTimeout(()=>{
        console.log(1)
        done()
    },1000)
}
const task2 = done => {
    setTimeout(()=>{
        console.log(2)
        done()
    },1000)
}
const task3 = done => {
    setTimeout(()=>{
        console.log(3)
        done()
    },1000)
}
const timeout = time => {
    return new Promise(resolve => {
        setTimeout(resolve, time)
        // setTimeout(resolve, 0)
    })
}
exports.ser = series(task1, task2, task3);
exports.per = parallel(task1, task2, task3);
exports.error = () => {
    return Promise.reject(new Error('task fail'));
}
exports.succ = () => {
    return Promise.resolve();
}
exports.async = async () => {
    await timeout(2000);
    console.log('renwu wanc')
}
// exports.stream = () => {
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('temp.txt')
//     readStream.pipe(writeStream);
//     return readStream
// }
// exports.stream = done => {
//     const readStream = fs.createReadStream('package.json')
//     const writeStream = fs.createWriteStream('temp.txt')
//     readStream.pipe(writeStream);
//     readStream.on('end', () => {
//         done();
//     })
// }
exports.pack = () => {
   return src('css/*.css')
   .pipe(load.cleanCss())
   .pipe(remane.remane({
       extname: '.min.css'
   }))
   .pipe(dest('dist')); // gulp提供的读取流能够使用通配符，同时匹配多个文件。
}
exports.default = () => {
    let read = fs.createReadStream('sass/index.scss')
    const writeStream = fs.createWriteStream('sass/index.min.scss')
    const tr = new Transform({
        transform: (chunk, encoding, callback) => {
            // 核心转换过程实现
            const input = chunk.toString();
            const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g,'')
            callback(null, output); // callback是错误优先的。
        }
    }) 
    read.
        pipe(tr).
        pipe(writeStream);
    return read
}
const delDir = () => {
    return del(['temp', 'dist']);
}
const style = () => {
    return src('src/sass/*.scss', { base: 'src' }).
    pipe(load.sass({ outputStyle: 'expanded' })). // outputStyle: 'expanded'完全展开，默认的结束}会和最后一个样式在同一行
    pipe(load.cleanCss()).
    pipe(dest('temp')).
    pipe(bs.reload({ stream: true }))
}
const script = () => {
    return src('src/js/*.js', { base: 'src' }).
    pipe(load.babel({ presets:[require('@babel/preset-env')]})). // 如果忘记配置preset会出现没有生效的情况。
    pipe(dest('temp')).
    pipe(bs.reload({ stream: true }))
}

const page = () => {
    return src('src/*.html', { base: 'src' }).
    pipe(load.swig({ defaults: { cache: false }, data })).
    pipe(dest('temp')).
    pipe(bs.reload({ stream: true }))
}
const image = () => {
    return src('src/img/**', { base: 'src' }).
    pipe(load.imagemin()).
    pipe(dest('dist')).
    pipe(bs.reload({ stream: true }))
}
const extra = () => {
    return src('public/**', { base: 'public' }).
    pipe(dest('dist')).
    pipe(bs.reload({ stream: true }))
}
const useref = () => {
    return src('temp/*.html', { base: 'temp' }).
    pipe(load.useref({ searchPath:['temp', '.']})).
    // 对html,js,css压缩、
    pipe(load.if(/\.js$/, load.uglify())).
    pipe(load.if(/\.css$/, load.cleanCss())).
    pipe(load.if(/\.html$/, load.htmlmin({
        collapseWhitepace: true, // 压缩html .默认指压缩属性中的口昂白字符
        minfyCSS: true, // 压缩html中的css
        minfyJS: true, // 压缩html中的js
    }))). 
    pipe(dest('dist'))
}
const serve = () => {
    watch('src/sass/*.scss',style);
    watch('src/js/*.js', script);
    watch('src/*.html', page);
    watch([
        'src/img/**',
        'src/font/**',
        'public/**',
    ], bs.reload); // 当文件发生修改时，触发浏览器的重新加载。
    bs.init({
        notify: false,
        // files: 'dist/**',
        port: 9088,
        server: {
            baseDir: ['temp', 'src', 'public'],
            routes: {
                '/node_modules': 'node_modules' // 当有这个路径时，优先在配置的路径下找。
            }
        }
    })
}
const compile = parallel(style, script, page);
// const build =  series(delDir, parallel(series(compile, useref), extra, image));
const build =  series(delDir, parallel(series(compile, useref), extra));
const develop = series(compile,serve);
module.exports = {
    build,
    delDir,
    develop,
}