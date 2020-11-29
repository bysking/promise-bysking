const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'


// 因为所有的Primise都遵循这个规范， 规定这里写法必须兼容所有的promise, 需要遵循规范进行编写
const resolvePromise = function (Promise2, x, resolve, reject) {
    // console.log(Promise2);
    // throw new Error('123')


    // 判断x值类型, 
    if (Promise2 === x) {
        reject(new TypeError('循环引用'))
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        this.onfulfilledArr = [];
        this.onrejectArr = [];

        let resolve = (value) => {
            if (this.status === PENDING) { // 状态pending才能修改状态
                this.value = value;
                this.status = RESOLVED;

                // 订阅列表执行
                this.onfulfilledArr.forEach(fn => { // 依次取出执行
                    fn()
                })
            }
        }
        let reject = (reason) => {

            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED

                // 通知订阅者执行
                this.onrejectArr.forEach(fn => {// 依次取出执行
                    fn();
                })
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err); // 执行时发生错误，报错等同于调用reject
        }

    }
    then(onfulfilled, onreject) {

        let Promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {

                setTimeout(() => { // js执行顺序先new再赋值给Promise2这里面才能拿到值，需要延迟，于是放到宏任务队列

                    try { // 处理异常
                        let x = onfulfilled && onfulfilled(this.value); // x的值类型需要判断：普通值还是Promise
                        resolvePromise(Promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
                // resolve(x)
            }

            if (this.status === REJECTED) {

                setTimeout(() => {
                    try {
                        let y = onreject && onreject(this.reason);
                        resolvePromise(Promise2, y, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
                // reject(y);
            }

            // 处理异步情况
            if (this.status === PENDING) {

                // 如果是异步，就先订阅好
                onfulfilled && this.onfulfilledArr.push(() => {// 这样套一层方便做切片加入自定义逻辑
                    setTimeout(() => {
                        try {

                            let x = onfulfilled(this.value); // x的值类型需要判断：普通值还是Promise
                            resolvePromise(Promise2, x, resolve, reject)

                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });

                onreject && this.onrejectArr.push(() => { // 这样套一层方便做切片加入自定义逻辑

                    setTimeout(() => {

                        try {
                            let y = onreject(this.reason)
                            resolvePromise(Promise2, y, resolve, reject)

                        } catch (e) {
                            reject(e)
                        }

                    }, 0)
                })
            }

        })

        return Promise2;
    }
}

module.exports = {
    Promise
};