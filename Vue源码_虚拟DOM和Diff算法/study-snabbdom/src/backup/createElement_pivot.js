// 真正创建节点。将vnode创建为DOM

// 这里插入节点需要两个参数
// 一个是变成真正dom的虚拟节点
// 一个是标杆：用来定位插入的位置
export default function(vnode, pivot) {
  console.log('目的是把虚拟节点', vnode, '插入到标杆', pivot, '之前');
  
  let domNode = document.createElement(vnode.sel);
  // 有子节点还是有文本？？
  if (vnode.text !== '' && (vnode.children === undefined || vnode.children.length === 0)) {
    // 它内部的文字
    domNode.innerText = vnode.text;
    // 这里要用pivot 的parent，因为 domNode 没有父节点
    pivot.parentNode.insertBefore(domNode, pivot)
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    
  }
}