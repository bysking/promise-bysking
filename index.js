let Promise = require('./Promise.js').Promise;
// let p = new Promise((resolve, reject) => {
//     // resolve('执行成功')
//     setTimeout(() => {
//         // reject('执行失败')
//         resolve(p)
//     }, 0)
// }).then((data) => {
//     console.log(data);
//     return data;
// }, err => console.log('111'+err)).then(data => {
//     console.log(data + '111');
// }, err => console.log('111'+err))

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

let p = new Promise((resolve, reject) => {
    resolve()
});

let promise2 = p.then((res) => {
    return promise2;
})

promise2.then((res) => {
    console.log(res);
}, err => console.log(err))  