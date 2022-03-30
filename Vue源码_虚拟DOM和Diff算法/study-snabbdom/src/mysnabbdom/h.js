import vnode from './vnode';

// 第一第二个参数这边是确定的，第三个不确定，所以用c
export default function h(sel, data, c) {
  // 检查参数的个数
  if (arguments.length != 3) {
    throw new Error('参数错误');
  }
  // 检查参数c的类型
  if (typeof c === 'string' || typeof c === 'number') {
    // 说明现在调用h函数是形态1
    // console.log(1);
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 这里也很神奇，自己啥都没干，嵌套本身就完成了
    const children = [];
    for (let i = 0; i< c.length; i += 1) {
      if (!(typeof c[i] === 'object' && c[i].hasOwnProperty('sel'))) {
        throw new Error('传入的数组中有项不是h函数');
      }
      children.push(c[i])
    }
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {
    // 这里也很神奇
    // const children = [c];
    return vnode(sel, data, [c], undefined, undefined);
  } else {
    throw new Error('传入的类型不对');
  }
  // return vnode(sel, data, c);
}