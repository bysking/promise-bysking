let fs = require('fs');
let Promise = require('./PromiseAPlus.js');

let p = new Promise((resolve, reject) => {
    // 执行一些逻辑

    reject('失败');// 标记失败态，并设置数据 多次调用
    resolve('成功'); // 标记成功态，并设置数据

});

p.then((data) => {
    console.log(data); // 成功的回调
}, (err) => {
    console.log(err); // 失败的回调
})