// export {}
// 类型的声明

// ---number 类型
let i:number = 10;
// i = 'hello';
// a = 'hello';

// ---str 类型
let j: string;
j = 'hello'



function fn(a: number, b: number): number {
    return a + b;
    // return a + '444';
}

fn(3, 5);
// fn(3, '44'); //报错


// ---字面量 类型
// 直接使用字面量进行类型声明

let a: '张三';
a;      // 这里声明了类型是张三，但是如果没有  a = '张三' 那么a还是  undefined
// a = '李四';  // 字面量类型，  类似于常量
// console.log(a)

// 字面量场景一般用于联合类型
// 可以使用 | 来连接多个类型（联合类型）

let b: 'male' | 'female';
b = 'male';
b = 'female';

let c: boolean | string;



// ---any 类型
// any表示的是任意类型，一个变量设置类型为any后相当于关闭了TS的类型检测
// 使用ts时，不建议使用any类型

// 声明类型时，如果不指定类型，则TS默认会解析成any （隐式any）
let d;
d = '123';
d = true;
d = {};



// ---unknown类型
// 表示未知的类型，实际就是一个类型安全的any
// unknown 的变量，不能直接赋值给其他变量


let e: unknown;
e = 10;
e = 'female';
e = [123, 456];
e = true;

// d的类型是any，可以赋值给任意变量
// 这边f表面上是 string，但是已经变成了 d 的 {}
let f: string;

f = d;
console.log(f)

e = 'hello';
// unkonwn 类型直接赋值报错
// f = e;

if (typeof e === 'string') {
    f = e;
}

// 但是这样麻烦，所以我们可以用 类型断言 来进行赋值

// 类型断言：   可以用来告诉解析器变量的实际类型

/**
 * 语法：
 * 
 * 变量 as 类型
 * <类型>变量
 */

e = true;

// f = e;

f = e as string;
f = <string>e;

// console.log(f, typeof f)

// ---void 类型
// void可以不返回，也可以用undefined等写法

function fn1(): void {
    // return undefined;
    // return null;
    // return;  
}



// ---never 类型
// 函数报错了，就没有返回结果，哪怕是void，也是有undefined

function fn2(): never {
    throw new Error('没有返回值')
}



// ---object 类型

// object 表示一个对象

let g: object;
// 如果单纯的使用 {} 进行类型的声明，太宽泛了，所有的对象，方法都是 object类型
g = {};
g = function () {

};


// {} 用来指定对象中可以包含哪些属性
// 语法： { 属性名：类型, 属性名: 类型 }

let h: {name: string, age: number};

h = { name: '孙悟空', age: 500}
// console.log(h);

// 但是这种声明必须完整精确的对应属性，不能少，也不能多
// 在属性名加?表示可选属性
// h = { name: '猪八戒', height: 188 };
let k: {name: string, age?: number, height?: number};
k = { name: '猪八戒', height: 188 };
// console.log(k);


// [propName: string]: any 
// propName 这个随意，也可以换成xxx，无所谓
// string表示，属性名必须的类型，表示属性名必须是字符串，这里如果实际写23，应该会隐式的转换成字符串的23
// 如果改成 number，那么 weight，size，abc这些会报错，需要用 数字作为属性名
// any 表示 属性值的类型，any代表任意类型的值都可以
let l: {name: string, [xxx: string]: any};
l = {name: '沙悟净', weight: 160, size: '43码', abc: 's', 23: 'aaa'}
console.log(l);


/**
 * 定义函数结果的类型声明
 * 
 * 语法： (形参: 类型, 形参:类型 ...) => 返回类型
 * 
 */

let m: (a: number, b: number) => number;
m = (a, b) => a + b;
// 或者
m = function (n1, n2) {
    return n1 + n2;
}





// ---array 类型
/**
 * 语法：两种格式
 * 
 *      类型[]
 *      Array<类型>
 * 
 */

// 数组一般用来存相同类型的数据
let n: string[];
n = ['123', '333'];
// n = [123, 456]; // 只能存string类型

let o: Array<number>;
o = [1, 2, 3];




// ---元组  类型
// 元组其实就是： 元素长度固定的数组
let p: [string, string] // 类型为string，长度为2的数组
// p = ['abc', 123];
// p = ['abc'];
let abc: string;
// p = [abc, '123', '456'];
p = [abc, '123'];





// ---enum 枚举 类型

enum Gender { male, female} // Gender后面没有 = ，也没有 :

let q: { name: string, gender: Gender };
q = { name: '孙悟空', gender: Gender.male };

console.log(q.gender === Gender.male);




// 扩展
// | 表示或，那么 & 表示 与
// let r: string & number; // 虽然可以这样声明，但是没有这样的实际属性，所以不能用在这里

let r: { name: string } & { age: number };
r = { name: '白龙马', age: 18 };
// 但是这里和 { name: string , age: number } 没区别，所以还是不知道具体的 & 一般的应用场景




// 类型的别名

// let s: 1 | 2 | 3 | 4 | 5;
// let t: 1 | 2 | 3 | 4 | 5;

// 这样就太麻烦了
// 可以给类型起个别名

// type myType = string;
// let s: myType;
type myType = 1 | 2 | 3 | 4 | 5;
let s: myType;
let t: myType;

console.log('---------');
