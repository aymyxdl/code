(function () {
    // 封装


    // 定义一个表示人的类
    class Person {

        // Ts可以在属性前面添加属性的修饰符

        /**
         *  public 修饰的属性可以在任意位置访问(修改)   默认值
         *  private 私有属性，私有属性只能在类内部进行访问(修改)
         *      - 通过在类中添加方法使得私有属性可以被外部访问
         * 
         *  protected 受保护的属性，只能在当前类或者子类中访问(修改)
         *  
         */
        
        private name: string;
        private age: number;

        constructor (name: string, age: number) {
            this.name = name;
            this.age = age;
        }


        // 为了避免胡乱的修改属性，所以需要通过某种手段来防止这种行为

        /**
         *  getter 方法用来读取属性
         *  setter 方法用来设置属性
         *      - 他们被称为属性的存取器
         */

        // 定义方法，用来获取name属性

        // getName () {
        //     return this.name;
        // }

        // getName = () => this.name;

        // // 定义方法，用来设置name属性

        // // setName (value: string) {
        // //     this.name = value;
        // // }

        // setName = (value: string) => this.name = value;


        // 上面的方法写起来很麻烦
        // Ts中有默认的方法进行 set get

        // 这里的方法名不能和属性名重合
        // 所以一般get set 用来提供访问，写成 name
        // 内部私有属性加上下划线，写成 _name
        // 我这里因为没写下划线， 所以 get set 用不了 name
        get namee(): string {
            return this.name;
        }

        set namee(value: string) {
            this.name = value;
        }

        // 然后通过 obj.name 调用的时候，实际上调用的是这两个方法
        // 要注意 是 obj.name = 'xxx'
        // 看上去是修改属性的写法，实际上是调用方法

    }

    const per = new Person('孙悟空', 16)

    /**
     * 现在属性是在对象中设置的，属性可以任意的被修改
     *  属性可以任意被修改将会导致对象中的数据变得非常不安全
     * 
     */

    // 上面虽然写了私有属性，但是编译后的js文件仍然可以这样操作
    // 这是因为这些语法是 TS 独有的，而ts经过转换后的js 并不会报错
    // 所以，我们需要在 tsconfig.json文件中设置 编译如果报错，不生成js文件
    // 这样从源头上解决问题
    // "noEmitOnError": true
    // per.name = '猪八戒';
    // per.age = -18;



    per.namee = '猪八戒戒'
    console.log(per.namee);


    // 演示一些其他的修饰符

    class A {
        num: number;
        private num2: number;
        protected num3: number;

        constructor (num: number, num2: number, num3: number) {
            this.num = num;
            this.num2 = num2;
            this.num3 = num3;
        }
    }

    class B extends A {
        test () {
            // public 的属性可以随意访问
            console.log(this.num);
        }

        // testB () {
        //     // 但是private的类只能在当前类中访问
        //     // 子类也不行
        //     // 这个时候可以使用 protected 修饰符
        //     console.log(this.num2);
        // }

        testC () {
            console.log(this.num3);
        }
    }


    // 属性和构造函数的语法糖

    // 一般的写法挺麻烦的

    // class C {
    //     name: string;
    //     age: number;

    //     constructor (name: string, age: number) {
    //         this.name = name;
    //         this.age = age;
    //     }
    // }

    // 有一种简洁写法

    class C {
        // 不能省略 public 这些修饰符
        constructor(public name: string, public age: number) {
        }

        
        // constructor(name: string, age: number) {
        // }
    }

    const objc = new C('C班的张三', 15);
    console.log(objc);
    

})()
