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
- Promise A+ 规范 https://promisesaplus.com/ 
- Promise A+ 规范 翻译版本 https://segmentfault.com/a/1190000018589798 

控制台打印一下Promise:

ƒ Promise() { [native code] // 本质上是一个函数或者对象class

- Promise 基本用法

Promise A+规范 内容：

1. promise 是一个带有符合此规范的then方法的对象或者函数。
2. thenable 是一个定义了一个then方法的对象或者函数
3. value 是一个任意合法的JavaScript值（包括undefined， thenable，或者promise）。
4.  reason 是一个指出为什么promise被rejected的值。
5.  exception 是一个使用throw语句抛出的值。

- 状态: pending,fulfilled 或者 rejected。
```js
const PENDING = 'PENDING'; // 等待状态：状态可以转移到FULLFILED or REJECTED
const FULLFILED = 'FULLFILED'; // 成功状态 状态不可变 对应一个value 不可变
const REJECTED = 'REJECTED'; // 拒绝状态 状态不可变 对应一个 reason 不可变

class Promise {
    constructor () {
        this.status = PENDING; // 初始状态
    }
}
```

- then 方法 接收两个函数作为可选参数

举个例子：promise.then(onFulfilled, onRejected)

```js
let p = new Promise((resolve, reject) => {
    // 执行一些逻辑

    resolve('成功'); // 标记成功态，并设置数据

    // reject('失败');// 标记失败态，并设置数据
});

p.then((data) => {
    console.log(data); // 成功的回调onFulfilled
}, (err) => {
    console.log(err); // 失败的回调onRejected
})
```

- then的链式调用

fulfilled 各个 onFulfilled 回调必须按其原始调用的顺序执行。
rejected  各个 onRejected 回调必须按其原始调用的顺序执行。

- then返回一个promise