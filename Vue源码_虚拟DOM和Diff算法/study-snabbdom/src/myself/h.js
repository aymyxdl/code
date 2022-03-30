import vnode from './vnode.js'

export default function (sel, data, c) {
  // 我们这里只写低配版的h函数，必须传入三个参数

  if (arguments.length !== 3) throw new Error('请传入三个参数')

  if (typeof c === 'string' || typeof c === 'number') {
    // 传入的是文本节点
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) {
    // 如果是数组，这些数组也必须是h函数，因此，数组成员也就是vnode对象
    const children = []

    c.forEach(sub => {
      if (!(typeof sub === 'object'  && sub.hasOwnProperty('sel'))) 
        // 表明不是vnode节点，说明传递的数组成员有问题
        throw new Error('数组成员有问题')

      // 重点，我们这里不需要递归调用，哪怕传入的参数是非常多的深层嵌套的数组
      // 因为传入的参数中值直接调用 h 函数，所以，我们这里不需要递归
      children.push(sub)
    })

    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 表明传入的是h函数,：因为是函数，调用h函数的最终返回结果一定是一个对象，而且是vnode对象，简略判断一下sel属性就行
    const children = []
    children.push(c)
    return vnode(sel, data, children, undefined, undefined)
  } else {
    throw new Error('对不起，传入的第三个参数有问题')
  }
}