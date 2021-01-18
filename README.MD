1.同步和异步

js 是单线程的 同一时间只能处理一个任务 某个任务处理时间很长（文件读取和ajax）导致用户等待影响用户体验
异步就是解决这种问题，对等待中的任务进行挂起，先执行后面的任务，待前面挂起的任务有结果后再继续执行

- 同步任务

主线程上排队执行的任务，严格的先后顺序 上一个任务执行完毕才会执行下一个任务

- 异步任务


文件读取例子(从书单文件获取书名，找到对应的书显示内容)

- 同步读取
```js
let fs = require('fs');

console.log('开始执行')

let name = fs.readFileSync('./bookList.txt', 'utf8');

let data = fs.readFileSync(name, 'utf8');

console.log(data);

console.log('结束执行')
```
- 异步读取
```js
let fs = require('fs');

console.log('开始执行')

fs.readFile('./bookList.txt', 'utf8', (err, name) => {
    fs.readFile(name, 'utf8', (err, data) => {
        console.log(data); // 多层嵌套导致回调地狱，理解维护困难，不清晰
    })
})

console.log('执行结束')
```

- Promise（承诺，将来会执行的意思），是一种异步编程的解决方案

控制台打印一下Promise:

ƒ Promise() { [native code] // 本质上是一个函数或者对象class

- Promise 基本用法

```js
let p = new Promise((resolve, reject) => {
    // 执行一些逻辑

    resolve('成功'); // 标记成功态，并设置数据

    // reject('失败');// 标记失败态，并设置数据
});

p.then((data) => {
    console.log(data); // 成功的回调
}, (err) => {
    console.log(err); // 失败的回调
})
```

- 一个Promise拥有三种状态 Pending fufill reject
只能由Pending 转移到另外两个状态之一，变化之后就不会再变更了