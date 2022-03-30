// 定义表示记分牌的类

class ScorePanel {
    // score和level用来记录分数和等级
    score: number = 0;
    level: number = 1;

    // 设置一个变量限制等级
    maxLevel: number;
    // 设置一个变量表示多少分屎升一级
    upScore: number;

    // 分数和等级所在的元素，在构造函数中进行初始化
    scoreEle: HTMLElement;
    levelEle: HTMLElement;

    constructor(maxLevel: number = 10, upScore: number = 5) {
        this.scoreEle = document.getElementById('score')!;
        this.levelEle = document.getElementById('level')!;
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }

    // 设置一个加分的方法
    addScore():void {
        // 使分数自增
        this.score += 1;
        this.scoreEle.innerHTML = this.score + '';

        // 判断分数是多少
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    }

    // 设置一个增加等级的方法
    levelUp():void {
        // 使分数自增
        if (this.level < this.maxLevel) {
            this.level += 1;
            this.levelEle.innerHTML = this.level + '';
        }
    }
}

export  default ScorePanel;
