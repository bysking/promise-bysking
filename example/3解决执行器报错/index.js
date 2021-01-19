let fs = require('fs');
let Promise = require('./PromiseAPlus.js');

let p = new Promise((resolve, reject) => {
    throw new Error('测试代码执行报错'); // 测试代码报错
});

p.then((data) => {
    console.log(data); // 成功的回调
}, (err) => {
    console.log(err); // 失败的回调
})