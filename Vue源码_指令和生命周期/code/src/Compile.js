export default class Compile {
  constructor(el, vue) {
    // vue实例
    this.$vue = vue;
    // 挂载点
    this.$el = document.querySelector(el);
    // 如果用户传入了挂载点
    if (this.$el) {
      var $fragment = this.node2Fragment(this.$el);
      // 编译
      this.compile($fragment);
    }
  }

  node2Fragment(el) {
    var fragment = document.createDocumentFragment();
    // console.log(fragment);
    var child;
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }
    return fragment;
  }

  compile(el) {
    console.log(el);
    // 得到子元素
    var childNodes = el.childNodes;
    var self = this;

    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        self.compileElement(node);
      }
    })
  }

  compileElement(node) {
    console.log(node, 'node');
    // 这里的方便之处在于不是讲html结构看作字符串，而是真正的属性列表

    var nodeAttrs = node.attributes;

    // 类数组对象变为数组
    // Array.from(nodeAttrs).forEach(attr => {
    [].slice.call(nodeAttrs).forEach(attr => {
      var attrName = attr.name;
      var value = attr.value;
      var dir = attrName.substring(2);
      // console.log(dir);

      // 看看是不是指令
      // 因为指令都是v- 开头，匹配到了就是索引为 0
      if (attrName.indexOf('v-') === 0) {
        // v-开头的就是指令
        if (dir === 'model') {
          console.log('发现了model指令', value);
        } else if (dir === 'if') {
          console.log('发现了if指令', value);
        }
      }
    })

  }
}