/*
 * @Author: your name
 * @Date: 2020-12-10 13:48:03
 * @LastEditTime: 2020-12-24 16:08:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \myGulpc:\Users\wing\Desktop\gulps\src\index.js
 */
import './css/index.css';
import png from './assets/img/temp.png';
import { div } from './router/hello.js';
document.write('Hello World!  Hello World!')
const edit = div();
const bb = () => {
    console.log('1000');
    console.log('1000');
}
// const img = document.createElement('img')
// img.src = png;
document.body.append(edit);
bb()
module.hot.accept('./router/hello.js', () => {
    document.body.removeChild(edit)
 console.log('插拔更新，不自动刷新')
})