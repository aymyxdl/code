import vnode from './vnode.js'
import createElement from './createElement.js'

export default function (oldVnode, newVnode) {
  // 1.判断旧的是vnode还是dom
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    // 将dom转化为vnode
    // oldVnode = h(oldVnode.tagName.toLowerCase(), {}, '')
    // 这里的eml要传入oldVnode这个 dom节点，因为它是真是存在的dom节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], '', oldVnode)
    console.log('oldVnode是dom，这里把它变为虚拟dom', oldVnode)
  }
  
  // 2.判断 oldVnode 和 newVnode 是不是同一个节点
  console.log('新老节点', oldVnode, newVnode)

  // if (newVnode.key && oldVnode.key === newVnode.key && oldVnode.sel === newVnode.sel) {
  if (oldVnode.sel === newVnode.sel) {
    // 是同一个节点
    console.log('新老节点是同一个节点')

    // 这里我不太理解，这里只是地址相等吧，万一改了对象里面的某个属性呢？
    // 判断新旧节点是否是同一个节点
    if (oldVnode === newVnode) return

    const children = newVnode.children

    // 判断新vnode是否有text属性 
    if (newVnode.text !== undefined && (children === undefined || children.length === 0)) {
      console.log('命中：新vnode有text属性');
      
      // 然后再看新老节点的text是否相同，如果不同，再修改
      // 这里不需要判断老节点里面的是什么数据，因为新节点是文本数据，肯定会覆盖
      if (newVnode.text !== oldVnode.text) {
        // 这里使用elm，都不用执行专门上树了
        oldVnode.elm.innerText = newVnode.text;
      }
    } else {
      // 表明新节点是有children
      // 判断老节点是否是文本节点还是children
      console.log('新节点有儿子节点', children)

      const oldCh = oldVnode.children
      if (oldVnode.text !== undefined && (oldCh === undefined || oldCh.length === 0)) {
        // 表明新节点是children，老节点是text
      // console.log('新节点儿子节点', )
        oldVnode.elm.innerText = ''

        const newDom = createElement(newVnode)
        oldVnode.elm.appendChild(newDom)

        // children.forEach(sub => {
        //   oldVnode.elm.appendChild(createElement(sub))
        // })
        
      } else {
        // 这里则是最复杂的判断：要进入精细化比较了
      }
    }
    
  } else {
    // 不是同一个节点，则暴力插入新的，再删除旧的
    // 这里为什么要先插入再删除呢？
    // 因为插入需要一个标杆，插入到原来的前面，然后再删除旧的，删掉了，就没有标杆了

    // 创建新的节点
    console.log('不是同一个节点')

    const newDom = createElement(newVnode)

    
    oldVnode.elm?.parentNode?.insertBefore(newDom, oldVnode.elm)
    oldVnode.elm?.parentNode?.removeChild(oldVnode.elm)
  }
}