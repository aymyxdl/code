

模板语法  =>  正常的HTML语法  (非常困难)

于是借助 抽象语法树AST 周转

模板语法  =>  抽象语法树AST  =>  正常的HTML语法





在vue中，模板代码，看起来是 html 格式的代码
其实是字符串，然后vue会将字符串 解析为 AST
AST就是个 js对象
里面的格式按照 节点的格式来(注意，不是虚拟dom，和虚拟dom的格式不一样)


AST的对象属性有  

tag
attrs
type
children

for
key
alias



为什么说 AST 不是 虚拟DOM
AST里面的 v-for v-if v-model 这些指令都没有转换
而虚拟DOM已经就是真实DOM那样差不多的结构了


抽象语法树和虚拟节点的关系：

模板语法  =>  抽象语法树AST  =>   渲染函数（h函数）   =>  虚拟节点


抽象语法树AST 产生h函数， 再转换成 虚拟dom


h函数（既是AST的产物，也是vnode的起源）

抽象语法树不会diff，diff发生在虚拟节点上

AST并不是直接生成 虚拟节点
而是生成h函数，再生成虚拟节点






算法储备：
指针思想



牛客网




ast的源码

parse函数
里面有pasehtml




vue中的 vue-loader 
其实是以 字符串的视角看待标签







问题：AST 和 mustache的区别








