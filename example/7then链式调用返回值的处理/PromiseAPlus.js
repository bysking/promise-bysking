const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

let resolvePromise = (promise2, x, resolve, reject) => {
    // then 返回Promise自身： 按照规范约定直接抛出类型错误，不能自己等待自己，死循环
    if (promise2 === x) {
        return reject(new TypeError('陷入死循环'))
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