import { hi } from './m1'

function abc(a: number, b: number): number {
    return a + b;
}

const obj: { name: string, age?: number } = { name: '孙悟空' };

// obj = { name: '孙悟空' }


console.log(obj);

obj.age = 18;
console.log(obj);


console.log(abc(13, 456));

console.log(hi);


// console.log(Promise);

