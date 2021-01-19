let fs = require('fs');
let Promise = require('./PromiseAPlus.js');

let p = new Promise((resolve, reject) => {

    // 测试同步
    resolve('hello world')

    // 测试异步
    // setTimeout(() =>{
    //     resolve('hello world')
    // }, 0)
});


// // 通过then方法返回一个新的Promise2实例，即可实现链式调用
// let Promise2 = new Promise((resolve, reject) => {
//     // 执行器内部
// });
// return Promise2;

p.then((data) => {
    return data+'3333333333'
}).then((data) => {
    console.log(data)
})