Promise 基础用法，有3个状态：等待，成功， 失败

let promise = new Promise((resolve, reject) => {
    // resolve('执行成功')
    reject('执行失败')
}).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})

// 异常后，resolve不执行, 如果没有错误处理函数，需要加一个catch捕获异常

let promise = new Promise((resolve, reject) => {
    throw new Error('失败后成功不会走')
    resolve('执行成功')
}).then((data) => {
    console.log(data);
}, (err) => {
    console.log(err);
})