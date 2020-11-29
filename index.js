let Promise = require('./Promise.js').Promise;
let p = new Promise((resolve, reject) => {
    resolve('执行成功')
    // setTimeout(() => {
    //     reject('执行失败')
    // }, 3000)
}).then((data) => {
    console.log(data);
}).then(data => {
    console.log(data + '111');
}, err => console.log('111'+err))

// let fs = require('fs');
// function read (url) {
//     return new Promise((resolve, reject) => {
//         fs.readFile(url, 'utf-8', (err, data) => {
//             if (err) {
//                 reject(err)
//             }
//             resolve(data)
//         })
//     })
// }

// read('./name.txt').then((data) => {
//     console.log(data+'11111111');
//     return data;
// }).then((data) => {
//     console.log(data + '2222222');
// })