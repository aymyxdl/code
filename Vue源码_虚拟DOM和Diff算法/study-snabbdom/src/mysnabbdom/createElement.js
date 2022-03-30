// 真正创建节点。将vnode创建为DOM

export default function createElement(vnode) {
  
  let domNode = document.createElement(vnode.sel);
  // console.log(vnode, '-------');
  // 有子节点还是有文本？？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 它内部的文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    for (let i = 0; i < vnode.children.length; i += 1) {
      // console.log(vnode.children[i]);
      let ch = vnode.children[i];
      let chDOM = createElement(ch);
      domNode.appendChild(chDOM)
    }
  }

  // 补充elm属性
  // 虚拟节点的挂载目标就是刚刚创建的dom(有点晕)
  vnode.elm = domNode;

  // 返回eml，elm是一个纯dom结构()
  return vnode.elm;
}