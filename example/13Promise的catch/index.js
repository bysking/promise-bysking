let PromiseSelf = require('./PromiseAPlus.js');


let p = new PromiseSelf((resolve, reject) => {
    reject('报错')
})

p.then().catch(err => {
    console.log(err)
})
// then(onfulfilled, onreject)本质等价于then方法的第一个方法不传


// p.then(null, err => {
//     console.log(err)
// })

