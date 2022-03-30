// shallowReactive(浅的劫持，浅的监视，浅的响应数据) 与 reactive(深的)

// 定义一个reactiveHandler处理对象
const reactiveHandler = {
    // 获取属性值
    get(target, prop) {
        if (prop === '_is_reactive' || prop === '_is_proxy') return true;
        const result = Reflect.get(target, prop);
        console.log('reactive拦截了读取数据', prop, result);
        return result;
    },

    // 修改属性值
    set(target, prop, value) {
        const result = Reflect.set(target, prop, value);
        console.log('reactive拦截了修改数据或者是添加数据', prop, result, value);
        return result;
    },

    // 删除属性值
    deleteProperty(target, prop) {
        const result = Reflect.deleteProperty(target, prop);
        console.log('reactive拦截了删除数据', prop, result);
        return result;
    }
}

// 定义一个shallowReactive函数，传入一个目标对象
function shallowReactive(target) {
    // 判断当前的目标对象是不是object类型(对象/数组)
    if (target && typeof target === 'object') {
        return new Proxy(target, reactiveHandler);
    }

    // 如果传入的数据是基本类型的数据，那么就直接返回
    return target;
}


// 定义一个reactive函数，传入一个目标对象
function reactive(target) {
    // 判断当前的目标对象是不是object类型(对象/数组)
    if (target && typeof target === 'object') {
        // 对数组或者是对象中所有的数据进行reactive的递归处理
        // 先判断当前对象是否是数组
        if (Array.isArray(target)) {
            // 数组的数据要进行便利操作
            target.forEach((item, index) => {
                target[index] = reactive(item);
            })
        } else {
            // 再判断当前的数据是不是对象
            // 对象的数据也要进行遍历的操作
            Object.keys(target).forEach((key) => {
                target[key] = reactive(target[key]);
            })
        }
        // 这个为什么是放在这里？？
        return new Proxy(target, reactiveHandler);
    }

    // 如果传入的数据是基本类型的数据，那么就直接返回
    return target;
}



// ===============================
// ===============================



// 定义一个readonlyHandler处理对象
const readonlyHandler = {
    get(target, prop) {
        if (prop === '_is_readonly' || prop === '_is_proxy') return true;
        const result = Reflect.get(target, prop);
        console.log('readonly读取了数据', target, prop);
        return result;
    },
    set(target, prop, value) {
        console.warn('readonly不能修改数据', target, prop, value);
        return true;
    },
    deleteProperty(target, prop) {
        console.warn('readonly不能删除数据', target, prop);
        return true;
    }
}

// 定义一个shallowReadonly函数
// 和shallowReactive一样
function shallowReadonly(target) {
    if (target && typeof target === 'object') {
        return new Proxy(target, readonlyHandler);
    }

    return target;
}

// 定义一个readonly函数
// 和reactive一样
function readonly(target) {
    if (target && typeof target === 'object') {
        if(Array.isArray(target)) {
            target.forEach((item, index) => {
                target[index] = readonly(item);
            })
        } else {
            Object.keys(target).forEach(key => {
                target[key] = readonly(target[key]);
            })
        }

        return new Proxy(target, readonlyHandler);
    }

    return target;
}



// ===============================
// ===============================



// 定义一个shallowRef函数
function shallowRef(target) {
    // 这里和之前的函数不一样了，之前的reactive返回的都是Proxy对象
    // ref返回的就是一个普通对象(ref对象)
    // 而且读取和修改的方式是  .value 
    return {
        _value: target,
        _is_ref: true,
        get value () {
            console.log('shallowRef劫持到了读取数据');
            return this._value;
        },
        set value (val) {
            console.log('shallowRef劫持到了修改数据，准备更新界面');
            this._value = val;
        }
    }
}



// 定义一个ref函数
function ref(target) {
    // 有个小问题，ref只需要执行这一步，就能变成深度的吗？
    target = reactive(target);
    return {
        _value: target,
        _is_ref: true,
        get value () {
            console.log('ref劫持到了读取数据');
            return this._value;
        },
        set value (val) {
            console.log('ref劫持到了修改数据，准备更新界面');
            this._value = val;
        }
    }
}




// ===============================
// ===============================


// isRef, isReactive, isReadonly, isproxy
// 只需要在之前的 shallowRef, shallowReactive, shallowReadonly的get方法前面加上判断就行

// 定义一个函数isRef,判断当前的对象是不是ref对象
function isRef(obj) {
    // 这里为什么不能用 ?
    // return obj?._is_ref;
    // 因为浏览器的版本太旧了
    return obj?._is_ref;
}


// 定义一个函数isReactive,判断当前的对象是不是reactive对象
function isReactive(obj) {
    return obj?._is_reactive;
}


// 定义一个函数isReadonly,判断当前的对象是不是readonly对象
function isReadonly(obj) {
    return obj?._is_readonly;
}


// 定义一个函数isProxy,判断当前的对象是不是reactive对象 或者 readonly对象
function isProxy(obj) {
    // return obj && (obj._is_readonly || obj._is_reactive);
    return isReadonly(obj) || isReactive(obj);
}

