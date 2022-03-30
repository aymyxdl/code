// 泛型

// function fn(a: any): any {
//     return a;
// }

// 首先ts不建议使用any
// 再者，参数和返回值都是any，不代表他们是同一个类型
// 可能参数是number，返回却成了string
// 而不满足我们参数的需求

/**
 *  在定义函数或是类时，如果遇到类型不明确就可以使用泛型
 * 
 */

// 随便是T还是K，表示一个任意类型，现在不知道。调用的时候才能确定

// a: T 这里能使用T，是因为前面定义了 <T>
function fn<T> (a: T): T {
    return a;
}

// 可以直接调用具有泛型的函数

fn(10);         // 不指定泛型，TS可以自动对类型进行推断

fn<string>('hello') //指定泛型

// 虽然用起来很麻烦，但是没办法，确实就是这样
// 不过好处就是我们用起来的时候，在使用的同时，就知道是何种类型
// 这样能够让结构更加清晰，明确

// 泛型可以指定多个
function fn2<T, K>(a: T, b: K): T {
    console.log(b);
    return a;
}

fn2<number, string> (123, 'hello');


// 但是这里虽然写了 T, K 
// 不过实际上却是任意类型，范围太大了
// 有时候如果想要限制一下泛型的范围

interface Inter {
    length: number;
}

// 我希望泛型 T 的类型是 Inter的子类（或者说是实现了Inter接口这个类）
// 使用 extends Inter
// 这里表示 T 是一个泛型，而且要求 T 实现了 Inter这个接口
// 这里部分 extends 还是 implements, 统一使用 extends

// T extends Inter 表示泛型T 必须是Inter的实现类（子类）
function fn3<T extends Inter> (a: T): number {
    return a.length; 
}

// 然后调用fn3的时候的要求就是
// 1、 必须要有 length 这个属性
// 2、 length的类型必须是number

console.log(fn3('123')); // 字符串有length属性

// fn3(123);   // 123 没有 length 属性，报错

// fn3({name: 'hello'}) // 对象没有length属性，报错

// fn3({ length: 'hello'}) // 有length属性，但是length不是number类型， 报错

console.log(fn3({ length: 333 })) // 有length属性，而且类型是number



// 除了在函数中可以使用泛型
// 在类中也可以使用泛型

class MyClass<T> {
    // name: T;
    // constructor(name: T) {
    //     this.name = name
    // }

    constructor(public name: T){
    }
}

const mc = new MyClass<string>('孙悟空');
console.log(mc, mc.name);

