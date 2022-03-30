// vnode 函数非常简单，就是把传进来的参数组合成一个对象返回
export default function (sel, data, children, text, elm) {
  return {
    sel, data, children, text, elm
  }
}