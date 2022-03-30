// 函数的功能非常简单，就是把传入的5个功能进行返回
export default function(sel, data, children, text, elm) {
  const { key } = data;
  return {
    sel, data, children, text, elm, key
  }
}