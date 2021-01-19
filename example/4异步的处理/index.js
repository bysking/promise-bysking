let fs = require('fs');
let Promise = require('./PromiseAPlus.js');

let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('测试异步执行-成功'); // 测试异步执行
        reject('测试异步执行-失败'); // 测试异步执行
    }, 0)
});

p.then((data) => {
    console.log(data); // 成功的回调
}, (err) => {
    console.log(err); // 失败的回调
})