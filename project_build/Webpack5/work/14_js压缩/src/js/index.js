const add = (x, y) => x + y;

// 下一行eslint所有规则都失效（下一行不进行eslint检查）
// eslint-disable-next-line
console.log(add(12, 33));

const p = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line
    console.log('--------');
    resolve();
  }, 2000);
});

// eslint-disable-next-line
console.log(p);
