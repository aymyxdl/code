import createElement from './createElement';

export default function patchVode(oldVnode, newVnode) {
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
    if (oldVnode.children?.length > 0) {
      // 这里是最复杂的情况
      console.log('这里是最复杂的情况');

    } else {

      // 旧node是文字，新node是数组
      console.log('旧node是文字，新node是数组');
      oldVnode.elm.innerText = '';
      for (let i = 0; i < newVnode.children.length; i += 1) {
        let newDom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(newDom);
      }
    }
  }
}