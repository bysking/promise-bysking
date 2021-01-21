let PromiseSelf = require('./PromiseAPlus.js');


let Promise = new PromiseSelf((resolve, reject) => {
    resolve('hello world')
});

let promise2 = Promise.then(() => {
    return promise2; // 返回自己： 直接抛出类型错误
})

promise2.then((data) => {
    console.log(data)
}, (err) => {
    console.log('--------------')
    console.log(err)
})