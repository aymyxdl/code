import vnode from "./vnode";
import createElement from './createElement';

export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数，是DOM节点还是虚拟节点？
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode);
    // 这里的elm表示这个虚拟节点已经是上树了，因为是真正的dom转换过来的
    // 所以elm就是它自己
  }
  
  
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    console.log('是同一个节点');

    // 判断新旧vnode是否是同一个对象
    if (oldVnode === newVnode) return;
    // 判断新 vnode有没有 text属性
    if (newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
      console.log('新虚拟有text属性，不需要管老节点的情况');
      if (newVnode.text !== oldVnode.text) {
        // 这里使用elm，都不用执行专门上树了
        oldVnode.elm.innerText = newVnode.text;
      }
    } else {
      // 新vnode没有text属性
      console.log('新vnode没有text属性');
      if (oldVnode.text !== undefined && oldVnode.children?.length > 0) {
        // 这里是最复杂的情况
      } else {
        // 旧node是文字，新node是数组
        oldVnode.elm.innerText = '';
        for (let i = 0; i < newVnode.children.length; i += 1) {
          let newDom = createElement(newVnode.children[i]);
          oldVnode.elm.appendChild(newDom);
        }
      }
    }





  } else {
    // console.log('不是同一个节点，暴力插入新的，删除旧的');
    // 这里为什么要先插入再删除呢？
    // 因为插入需要一个标杆，插入到原来的前面，然后再删除旧的，删掉了，就没有标杆了

    let newVnodeElm = createElement(newVnode);

    // 插入到老节点之前
    // console.log(newVnodeElm);
    if(oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm);
    }

  }
  // console.log(oldVnode);
}