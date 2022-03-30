// 引入其它的类
import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';


// 游戏控制器，控制其他的所有类
class GameControl {
    // 定义三个属性
    // 蛇
    snake: Snake;
    food: Food;
    scorePanel: ScorePanel;

    // 创建一个属性来存储蛇的移动方法（也就是按键的方向）
    direction: string = '';

    // 创建一个属性用来记录游戏是否结束
    isLive: Boolean = true;

    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(10, 3);

        this.init();
    }

    // 游戏的初始化方法，调用后游戏即开始
    init() {
        // 绑定键盘按键按下的事件

        // 这里因为传的是回调函数，到时候调用回调的对象并不是我们这个的GameControl对象
        // 而是 #document
        // document.addEventListener('keydown', this.keydownHandler);
        // 所以需要用到bind
        
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 是否可以通过赋值 that ，保存this来达到效果？
        // 需要解决如何给回调函数传递参数
        // const that = this;
        // document.addEventListener('keydown', this.keydownHandler(that));

        this.run();
    }

    /** 
     *  注意,event.key 返回的结果在 谷歌和ie中并不一样，所以要做兼容考虑
     *  谷歌:    ArrowUp         IE：   Up
     *          ArrowDown               Down
     *          ArrowLeft               Left
     *          ArrowRight              Right
     * 
     * 
     * 或者使用 event.keyCode 参数作为判断
     */

    // 创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        // console.log(event.key, event);
        // 创建direction属性
        this.direction = event.key;

        // 然后需要检查 event.key 的值是否合法（用户是否按了正确的按键）
        
    }

    // 创建一个控制蛇移动的方法
    run() {
        /**
         * 根据方向（this.direction） 来使蛇的位置改变
         *      向上 top  减少
         *      向下 top  增加
         *      向左 left 减少
         *      向右 left 增加
         *  
         * 
         */

        // 获取蛇现在的坐标
        let X = this.snake.X;
        let Y = this.snake.Y;


        // 根据按键方向来修改 X Y 的值
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                // 向上移动 top减少
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                // 向下移动 top增加
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                // 向左移动 left减少
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                // 向右移动 top增加
                X += 10;
                break;
        }


        // 检查蛇是否吃到了食物
        this.checkEat(this.snake.X, this.snake.Y)


        // 修改蛇的位置
        // console.log(X, typeof X, this.snake);

        try {
            this.snake.X = X;
            this.snake.Y = Y;
        } catch (e) {
            // 进入到cath，说明出现了异常，游戏结束，弹出一个提示
            alert(e.message + '：GAME OVER');
            // 将isLive设置为false
            this.isLive = false;
        }
        

        // 开启一个定时器调用
        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    // 定义一个方法，用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            
            console.log('吃到食物了');
            // throw new Error('');

            // 食物的位置要进行重置
            // 分数增加
            this.scorePanel.addScore();
            this.food.change();
            // 蛇要增加一节
            this.snake.addBody();
        };
    }
}

export default GameControl;