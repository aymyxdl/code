// 真正创建节点。将vnode创建为DOM

export default function createElement(vnode) {

  let domNode = document.createElement(vnode.sel);

  // 有子节点还是有文本？？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 它内部的文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    let arr = vnode.children
    for (let i = 0; i < arr.length; i += 1) {
      let chDom = createElement(arr[i])

      // 这里需要用 domNode，是上面创建的真实孤儿dom节点
      domNode.appendChild(chDom)
    }
  }
  // 这里记住要把elm标记上
  vnode.elm = domNode;

  return domNode;
}