console.log('index.js文件被加载了~~');


// 这个情况下,并没有懒加载,就是正常的模式
/* 
import { mul } from './test';
document.getElementById('button').onclick = function () {
  console.log(mul(2, 3));
}
 */


// 懒加载
// 第一次加载后,多次点击的话,并不会多次加载
// 而是直接读取缓存的数据（可以通过看test的log验证）

document.getElementById('button').onclick = function () {
  // 懒加载

  // import(/* webpackChunkName: 'name' */'./test').then(({ mul }) => {
  //   console.log(mul(2, 3));
  // })

  // 预加载 prefetch: 会在使用之前，提前加载js文件
  import(/* webpackChunkName: 'name', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(2, 3));
  })

  
  // 正常加载可以认为是并行加载（同一时间加载多个文件）
  // 预加载 prefetch：等其它资源加载完毕，浏览器空闲了，再偷偷加载资源

  // 懒加载有个小问题：用的时候才加载(http请求)，如果文件过大，会有一点点延迟的效果
  // 预加载就不会，先给你偷偷加载好，用的时候已经加载好了，又不会影响其它资源的加载（不过兼容性很差，只能在pc高端浏览器使用，移动端，ie会有问题）

  // 懒加载用的时候才发送http请求
  // 预加载等其它资源优先加载完毕，再偷偷发送请求加载
}