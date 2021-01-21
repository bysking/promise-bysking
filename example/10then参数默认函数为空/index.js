let PromiseSelf = require('./PromiseAPlus.js');


let Promise = new PromiseSelf((resolve, reject) => {
    resolve('hello world')
});

let promise2 = Promise.then(() => {
    return new PromiseSelf((resolve, reject) => {
        resolve(new PromiseSelf((resolve, reject) => {
            resolve('hello world')
        }));
    })
})

promise2.then((data) => {
    console.log(data)
}, (err) => {
    console.log('--------------')
    console.log(err)
})

// // 两种Promise的混用,需要兼容，所以需要判断关系实现不同的Promise之间的相互调用
// let Promise2 = new PromiseSelf((resolve, reject) => { // 自己写的Promise
//     resolve('hello world')
// });

// Promise2.then(() => {
//     return new Promise(); // 原生的ES6的Promise
// })