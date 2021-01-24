
const Promise = require('../7then链式调用返回promise copy/PromiseAPlus.js');
let PromiseSelf = require('./PromiseAPlus.js');

// Promise.all 表示等待所有的 promise全部执行成功后才会执行回调 如果有一个失败则失败

let p1 = new PromiseSelf((resolve, reject) => {
    setTimeout(() => {
        resolve('成功1')
    }, 1000)
})

let p2 = new PromiseSelf((resolve, reject) => {
    setTimeout(() => {
        resolve('成功2')
    }, 2000)
})
let p3 = new PromiseSelf((resolve, reject) => {
    setTimeout(() => {
        resolve('成功3')
    }, 3000)
})

PromiseSelf.race([p1, p2, p3]).then(value => {
    console.log(value);
}, error => {
    console.log(error);
})