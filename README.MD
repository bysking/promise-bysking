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

如果一个Promise的then方法中返回一个Promise会自动将这个Promise执行，并且采用他的状态，如果成功会将状态向外层的then传递，
如果返回的是一个普通值，会将这个值作为下一个then的成功的结果
如果想终端2Promise直接返回一个空return new Promise(() => {}),可以返回一个pending状态而使得下一个then不满足执行条件
