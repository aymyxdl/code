/*class Dog {
    name: string = '旺财';
    age: number = 3;

    bark () {
        alert('汪');
    }
}*/

// const dog = new Dog();
// const dog1 = new Dog();
// const dog2 = new Dog();
// const dog3 = new Dog();


// console.log(dog);
// console.log(dog1);
// console.log(dog2);
// console.log(dog3);

// 这个时候，会发现所有的实例，name，age都是一样的
// 日常环境这么创建就没有意义

class Dog {

    // 这里定义了，构造函数中就不会报错了
    // 1、 之前用js写，都不需要定义，所以我还以为这外面写的和构造方法里面直接用的不是同一个东西
    // 2、 类里面声明定义属性，不能用 let const，我也不知道为什么，用了就报错，而外面不用反而会报错
    name: string;
    age: number;
    // constructor 被称为构造函数
    // 构造函数会在对象创建时调用
    constructor(name: string, age: number) {
        // 这个时候，this.age或者name会报错
        // 这是因为name和age在类中没有定义
        this.name = name;
        this.age = age;
    }
}


