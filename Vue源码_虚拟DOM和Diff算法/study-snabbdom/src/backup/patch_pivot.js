import vnode from "./vnode";
import createElement from './createElement';

export default function(oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点？
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    // 这里的elm表示这个虚拟节点已经是上树了，因为是真正的dom转换过来的
    // 所以elm就是它自己
  }
  
  
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {

  } else {
    // console.log('不是同一个节点，暴力插入新的，删除旧的');
    // 这里为什么要先插入再删除呢？
    // 因为插入需要一个标杆，插入到原来的前面，然后再删除旧的，删掉了，就没有标杆了

    createElement(newVnode, oldVnode.elm);
  }
  console.log(oldVnode);
}