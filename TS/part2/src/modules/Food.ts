// 定义食物类Food

class Food {
    // 定义一个属性表示食物所对应的元素
    element: HTMLElement;

    constructor() {
        /*因为 food 这个html元素按常理来说可能不存在
        所以需要判断一下
        但是我们这里可以明确的知道存在，所以在后面加上 !
        查一下 ! 表示什么意思*/
        // 获取页面中的food元素并将其赋值给element
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物X轴坐标的方法
    get X() {
        return this.element.offsetLeft
    }

    // 定义一个获取食物Y轴坐标的方法
    get Y() {
        return this.element.offsetTop
    }

    // 修改食物的位置
    change(): void {
        // 生成一个随机的位置
        // 食物的位置最小是0， 最大是 290
        // 蛇移动一次就是一格，一格的大小就是10，所以要求食物的坐标必须是整10

        let top = Math.round(Math.random() * 29) * 10;
        // Math.floor(Math.random() * 30) * 10;
        let left = Math.round(Math.random() * 29) * 10;
        this.element.style.left = `${ left }px`;
        this.element.style.top = `${ top }px`;
    }
}

export default Food;