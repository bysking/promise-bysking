let PromiseSelf = require('./PromiseAPlus.js');

// function loadData () {
//     setTimeout(() => {
//         console.log('取到了数据')// 模拟ajax异步请求
//     }, 1000)
// }

// console.log('开始获取数据')
// loadData();
// console.log('获取数据后doSomething') // 需要封装一个Promise


// 想实现
// loadData.then((data) => {
//     // doSomething
// })

// 快捷方案： 封装一个延迟对象
function loadData () {
    let dfd = PromiseSelf.deferred();
    setTimeout(() => {
        // console.log('取到了数据')// 模拟ajax异步请求
        dfd.resolve('取到了数据')
    }, 1000)

    return dfd.promise
}

loadData().then((data) => {
    console.log(data)
})
