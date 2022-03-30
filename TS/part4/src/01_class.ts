// 使用 class 关键字来定义一个类

/*class Person {
    // 单纯的定义一个类非常简单
}*/

/*
*   对象中包含了2个部分
*   属性
*   方法
* */
class Person {

    /**
     *  直接定义的属性是实例属性，需要通过对象的实例去访问
     *      const per = new Person{}
     *      per.name
     *
     *  使用static开头的属性是静态属性（类属性），可以直接通过类去访问
     *      Person.age
     *
     *
     *  readonly开头的属性表示一个只读的属性，无法修改
     *
     */

    // 定义实例属性（通过实例访问）
    name: string = '孙悟空';

    // 在属性面前使用static关键字可以定义类属性（静态属性：通过方法名就可以访问，不需要创建对象就可以使用）
    static age:number = 12

    // readonly name: string = '孙悟空';
    // static readonly age:number = 12

    // 定义方法
    // 和属性一样，直接写的就是实例方法
    // 通过static写的就是类方法

    /*sayHello():void {
        console.log('hello------');
    }*/

    // 可以不设置返回类型
    // per.sayHello
    sayHello() {
        console.log('hello------');
    }

    // Person.sayHello1
    static sayHello1():void {
        console.log('hello111------');
    }
    
} 

const p = new Person();

console.log(p);

// console.log(p.name);

// console.log(Person.age);

