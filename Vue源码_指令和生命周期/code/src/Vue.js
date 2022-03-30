import Compile from "./Compile";

export default class Vue {
  constructor(options) {
    // 把参数options对象存为 $options
    this.$options = options || {};
    // 存数据
    this._data = options.data || undefined;
    new Compile(options.el, this);
  }
}