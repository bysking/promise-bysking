let fs = require('fs');
let Promise = require('./PromiseAPlus.js');

let p = new Promise((resolve, reject) => {

    // 测试同步
    resolve('hello world')

});



p.then((data) => {
    throw new Error('测试异常处理');
}).then((data) => {
    console.log('执行成功')
}, (err) => { // 失败函数
    console.log('执行失败')
    console.log(err)
})