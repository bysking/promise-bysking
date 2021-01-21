const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

let resolvePromise = (promise2, x, resolve, reject) => {
    // then 返回Promise自身： 按照规范约定直接抛出类型错误，不能自己等待自己，死循环
    if (promise2 === x) {
        return reject(new TypeError('陷入死循环'))
    }

    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        // 进一步判断是不是Promise对象：拥有then方法，最多也只做到这一层

        try {
            let then = x.then // 读取then会触发特性get逻辑，有可能是Object.defineProperty定义的返回别的东西

            if (typeof then === 'function') { // 也只能做到这个地步，判断是Promise
                then.call(
                    x, 
                    (data) => { // 成功的回调

                        // resolve(data) // 普通值的情况
                        resolvePromise(promise2, data, resolve, reject) // 递归处理： 普通值与promise
                    }, 
                    (err) => { // 失败的回调
                        reject(err)
                    }
                )
            } else { // { then: 111 }
                resolve(x)
            }

        } catch(err) {
            reject(err)
        }
    } else {
        // 普通值 直接走resolve
        resolve(x);
        
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;

        this.onfulfilledArrCb = [];
        this.onrejectArrCb = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULLFILED;
                this.value = value;

                this.onfulfilledArrCb.forEach(fn => {
                    fn()
                })
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                this.onrejectArrCb.forEach(fn => {
                    fn()
                })
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err);
        }

    }

    then(onfulfilled, onreject) {

        let Promise2 = new Promise((resolve, reject) => {
            if (this.status === FULLFILED) {

                setTimeout(() => {
                    try {
                        let x = onfulfilled(this.value);
                        // resolve(x);

                        resolvePromise(Promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
            };

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let y = onreject(this.reason);
                        // reject(y);

                        resolvePromise(Promise2, y, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
            }

            if (this.status === PENDING) {

                let onfulfilledfn = () => {
                    setTimeout(() => {
                        try {
                            let x = onfulfilled(this.value);
                            // resolve(x);
                            resolvePromise(Promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }

                    }, 0)
                }
                this.onfulfilledArrCb.push(onfulfilledfn);

                let onrejectfn = () => {

                    setTimeout(() => {
                        try {
                            let y = onreject(this.reason);
                            // reject(y);
                            resolvePromise(Promise2, y, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }

                    }, 0)
                }

                this.onrejectArrCb.push(onrejectfn);
            }
        });

        return Promise2;
    }
}

module.exports = Promise;