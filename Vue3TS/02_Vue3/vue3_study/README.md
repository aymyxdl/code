1、 如果vscode不能识别 .vue 文件
在vscode的插件中搜索 vue，选择 Vue 3 Snippets

2、 红色波浪线
这是因为有的插件安装了eslint设置
在设置中搜索 eslint，在 vetru中 把勾选去掉


VUE3的正式讲解
3、setup 和 ref 的基本使用

4、reactive 的基本使用

5、操作代理对象如何影响数据

6、vue2和vue3的响应式原理的区别（重点，面试基本必问）

先讲述vue2的响应性原理，有了铺垫之后，再去说vue3的响应式原理

vue2:
    核心：
        对象：通过 Object.defineProperty对 对象 的已有属性值的读取和修改进行劫持（监视/拦截）
        数组：通过重写数组 更新数组 一系列 更新元素 的方法来实现元素修改的劫持

        Object.defineProperty(data, 'count', {
            get () {},
            set () {}
        })


        问题：
            对象操作： 新添加的属性 或删除已有属性，界面不会自动更新（对象的这个缺陷，是因为新的数据没有被劫持，因为没有get/set）
            数组操作： 直接 通过下标 替换元素 或 更新length，界面不会自动更新（一定要搞清楚，数组这个缺陷是只重写了7个方法，下标操作不涉及到这7个方法，所以没效果）

            const arr = [1, 2, 3];     //此数据绑定到了页面上
            arr[0] = 5;        // 通过下标修改数据，无效，不会响应式更新
            arr[3] = 6;        // 通过下标更新length，来达到添加元素的效果 无效，不会自动更新



        详解：
            vue2的响应式原理的核心，是通过 Object.defineProperty 这个方法去实现的
            它会把这个对象中 已经存在的属性的值 进行一个读取或者更改（进行这么一个劫持的操作）

            但是这种方式，有一定的问题在里面： 
            Object.defineProperty 这个方法，第三个参数是一个配置对象，里面有get 和 set
            如果对目标对象里面的属性值，要进行读取，那么会进入到get
            如果进行修改，那么会进入到set

            但是这个时候，针对当前这个对象进行 添加新的属性 或删除已有属性，界面不会自动更新

            data() {
                return {
                    obj: {}
                }
            },
            methods: {
                updateUser() {
                    this.obj.name = '鸣人';
                    this.obj.age = 2;
                    this.obj.gender = '男'
                    console.log(this.obj, '======');
                    // 这个时候，虽然log出来的属性变化了，但是页面的数据并没有响应式的渲染
                    // 需要手动 forceUpdate 才会渲染
                    // this.$forceUpdate();
                }
            }


            同样的，vue2里面如果要把一个普通数组变成响应式的数组，它会重写数组里面的 更新数组的一系列方法，来实现这个元素的修改（这句话比较绕）
            简单来说，就是想要对响应式的数组中的元素进行修改操作， 它(vue2)需要把更改这个元素的方法，进行重写之后，来实现这个修改的操作（具体如何重写不知道）

            但是数组的这种方式，也有一定的问题：当直接 通过下标 替换元素 或 更新length，界面不会自动更新
            所以，后来vue2里面出现了一个方法，set或者叫$set，可以来实现响应式数组的操作

            data() {
                return {
                    obj: {},
                    arr: [1, 2, 3]
                }
            },
            methods: {
                updateUser() {
                    this.obj.name = '鸣人';
                    this.obj.age = 2;
                    this.obj.gender = '男';
                    // 这里通过数组下标进行操作并不会响应式渲染更新
                    this.arr[2] = 'niao';
                    this.arr[3] = 'hello';
                    console.log(this.obj, '======', this.arr);
                    // 除非 set 或者 forceUpdate，另外 set数组的同时，也会把刚刚的obj进行响应式更新，这是为什么我就不知道了
                    // this.$set(this.arr);
                    // this.$forceUpdate();
                }
            }




            

vue3:
    核心：
        通过Proxy(代理)：拦截对data任意属性的任意（13种）操作，包括属性值的读写，属性的添加，属性的删除等...
        通过Reflect(反射)：动态对被代理对象的相应属性进行特定的操作


        详解：
            而到了vue3里面，就完全不一样了
            vue3通过 proxy代理对象和reflect反射对象，两个配合来进行监视和响应操作

            Proxy：
                    可以通过proxy 代理对象 实现把普通对象变成响应式对象的操作，实现一个数据代理的操作
                    用的同时需要通过new，来传入2个参数 target, handler
                    const p = new Proxy(target, handler)
                    target: 就是目标对象
                    handler: 就是处理器对象，用来监视数据的变化（里面的监视的方法有13个，一般常用的就是 get set deleteProperty）
                            但是单独使用 get set deleteProperty 这些方法还不行，需要在方法内部配置使用 reflect对象
                            Reflect不是一个函数对象，因此它是不可构造的
                            意思就是静态的，不是通过new生成的，通过函数对象调用 比如： Array.isArray(), Promise.resolve(), Object.defineProperty()
                            所以调用方式就是 Reflect.get(target, propertyKey)

                            比如hanler中的set属性 中使用发射方法需要传入的属性 Reflect.set(target, prop, val)
                            这个target  ->  就是目标对象(实质就是Proxy 传入的target, 但是这里固定的写法就写 target)
                            这个prop  ->  就是目标属性(你要修改的那个属性)
                            这个val  ->  修改后的值

            代码实现： 05_
        
        
7、 用户片段 vv3
    vue.json

	"Print5 to console": {
	"prefix": "vv3",
	"body": [
		"<template>",
	  	"</template>\n",
	  	"<script lang=\"ts\">",
	  	"import { defineComponent, reactive } from 'vue';\n",
	  	"export default defineComponent({",
		"\tname: 'App',",
	  	"});",
	  	"</script>\n",
	  	"<style>",
	  	"</style>"
	],
	"description": "Log output to console"
	}

    代码格式化快捷键：  【Shift】+【Alt】+F

    1、 单行注释
        添加单行注释：Ctrl + / 或 先按CTRL+K，再按CTRL+U
 
        取消单行注释：Ctrl + / 或 先按CTRL+U，再按CTRL+K

    2、多行注释
        Alt + Shift + A



8、setup的执行机制

9、setup返回值详解

10、setup函数参数

11、ref和reactive的细节问题

12、watch和watchEffect

13、生命周期

14、hook函数

    需要安装axios
    npm install axios -S

    // 请求成果的数据
    const data = ref(null); // 坑
    // 这里会埋下一个隐患
    // 因为一开始没有数据，给data赋值null，并没有问题
    // 但是后面一旦ajax请求返回了数据，不管成功还是错误，都要改变数据的类型
    // 到时候就会报错


    请求json数据可以通过地址
    http://localhost:8080/data/address.json
    http://localhost:8080/data/products.json
    // 有点奇怪为什么路径 public不要加上

    或者通过ajax
    useRequest('data/address.json')
    useRequest('data/products.json')

    watch(data, () => {
      console.log(data.value.length);
    })
    // 这个时候会有问题，data因为useRequest.ts中初始设置null
    // 但是后面可能为对象，又可能为数组
    // 所以ts会报错

    //所以这个时候需要泛型，在useRequest.ts加入泛型
    export default function<T>(url: string) 
        const data = ref<T | null>(null); // 坑

    // 一开始我还不知道为社么泛型加载 function上面
    // export default function<T>
    // 后来其他页面才发现，我们需要调用这个方法， 这个时候传入泛型
    useRequest<ProductData[]>
    useRequest<AddressData>
    // 所以代码这东西，还是要多写，写着写着就会了

    // 定义接口
        interface AddressData {
        id: number;
        address: string;
        distance: string;
        }

        interface ProductData {
        id: string;
        title: string;
        price: number;
        }

15、toRefs

16、ref的另一个作用：获取页面中的元素

17、shallowReactive 和 shallowRef

    shallowReactive: 只处理了对象内最外层数据的响应式(也就是浅响应)

    shallowRef: 只处理了value的响应式，不进行对象的reactive处理



这些函数为什么放在

    if (target && typeof target === 'object') {
        if(Array.isArray(target)) {
            // ...
        } else {
            // ...
        }
        // return 为什么放在这里
        return new Proxy(target, shallowHandler);
    }




常见的函数对象

Array.isArray();
Object.defineProperty();
Reflect.get();
Reflect.set();
Reflect.deleteProperty();
Promise.resolve();
Promise.reject();
Object.keys();



数组和对象的遍历

    arr.forEach((item, index) => {})


    Object.keys(obj).forEach((key) => {})


vue3 怎么使用 less 并且配置babel


这样报错
<input type="checkbox" v-model="todo.isCompleted" />
这样写不报错，但是控制台还是有warn
<input type="checkbox" :checked="todo.isCompleted" v-model="isCompleted" />


// 调用方法addTodo的方法
// 问题：vue2中应该是通过emit让父组件去修改吧？
// vue3中这样是不是违背了单向数据流的原则？



vue3中computed的问题
// 问题，这里的computed为什么是传入对象
const isComplete = computed({
    get(){},
    set(){},
});

// 这里又是传入回调
const fullName1 = computed(() => {
    // console.log(1);
    return user.firstName + "_" + user.lastName;
});

computed如果只需要get操作，那么只需要一个回调就行
如果同时需要set操作，那么就是传入一个对象
get是省略写法