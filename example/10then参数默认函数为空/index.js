let PromiseSelf = require('./PromiseAPlus.js');


let Promise = new PromiseSelf((resolve, reject) => {
    // resolve('hello world')
    reject('reject err')
});

// then传递空函数，会传递返回值
let promise2 = Promise.then().then().then((data) => {
    console.log('成功回调', data)
}, (err) => {
    console.log('失败回调', err);
})