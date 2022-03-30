// 因为ts会检测所有文件中的同名函数
// 所以代码放到立即执行函数中，这样不会产生命名冲突

(function () {

    /*class Dog {
        name: string;
        age: number;
        constructor (name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        sayHello () {
            console.log('汪汪汪');
        }
    }

    class Cat {
        name: string;
        age: number;
        constructor (name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        sayHello () {
            console.log('喵喵喵');
        }
    }

    const dog = new Dog('旺财', 5);
    const cat = new Cat('咪咪', 3);

    console.log(dog);
    dog.sayHello();

    console.log(cat);
    cat.sayHello();*/



    // 这个时候会发现 Dog 和 Cat 有很多重复的代码
    // 这个时候我们就可以把这些冗余代码提取出来

    // 定义一个 Animal 类

    class Animal {
        name: string;
        age: number;

        constructor (name: string, age: number) {
            this.name = name;
            this.age = age;
        }

        sayHello () {
            console.log('动物在叫');
            
        }
    }

    /**
    * 
    * Dog extends Animal
    *      - 此时，Animal被称为弗雷，Dog被称为子类
    *      - 使用继承后，子类将会拥有父类所有的方法和属性
    *      - 通过继承可以将多个类中共有的代码写在一个父类中
    *          这样只需要写一次即可让所有的子类都同时拥有父类中的方法和属性
    *          如果希望在子类中添加一些父类中没有的属性或方法，直接在子类中添加
    *      - 如果在子类中添加了父类相同的方法，则子类方法会覆盖父类
    *          这种子类覆盖父类方法的形式：重写
    * 
    */

    // 定义一个狗的类
    // 使Dog类继承Animal类

    class Dog extends Animal {
        run () {
            console.log(`${this.name}在跑~~~`);
        }
    }


    // 定义一个猫的类
    // 使Cat类继承Animal类
    class Cat extends Animal {
        sayHello () {
            console.log('喵喵喵');
        }
    }

    const dog = new Dog('旺财', 5);
    const cat = new Cat('咪咪', 3);

    console.log(dog);
    dog.sayHello();
    dog.run()
    console.log(cat);
    cat.sayHello();
    
    

    // OCP原则（开闭原则，开启扩展，关闭修改）

})()
