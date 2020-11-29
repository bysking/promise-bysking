let Promise = require('./Promise.js').Promise;
let p = new Promise((resolve, reject) => {
    // resolve('执行成功')
    reject('执行失败')
}).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})