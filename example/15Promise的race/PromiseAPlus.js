const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

// 判断Promsie
let isPromise = function (p) {
    if (typeof p === 'object' && p !== null || typeof p === 'function') {
        return typeof p.then === 'function'
    }

    return false;
}

let resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
        return reject(new TypeError('陷入死循环'))
    }

    if (typeof x === 'object' && x !== null || typeof x === 'function') {
        let called; // 考虑引入的第三方promise，的规范性问题，成功，失败，都只会执行一次，多次将被忽略，状态只能修改一次
        try {
            let then = x.then

            if (typeof then === 'function') { 
                then.call(
                    x, 
                    (data) => { 
                        if (called) {
                            return;
                        }
                        called = true;
                        resolvePromise(promise2, data, resolve, reject) 
                    }, 
                    (err) => {
                        if (called) {
                            return;
                        }
                        called = true;
                        reject(err)
                    }
                )
            } else {
                resolve(x)
            }

        } catch(err) {
            if (called) {
                return;
            }
            called = true;
            reject(err)
        }
    } else {
        resolve(x);
        
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING;

        this.onfulfilledArrCb = [];
        this.onrejectArrCb = [];

        let resolve = (value) => {

            if (value instanceof Promise) {
                return value.then(resolve, reject); // 如果出现resolve(new Promise)，则调用其then方法执行，直到解析一个普通值
            }

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

        // 可选参数的处理，默认给一个函数
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : val => val;
        onreject = typeof onreject === 'function' ? onreject : err => { throw err };


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

    catch(onreject) {
        return this.then(null, onreject);
    }
}

// 构造promises-aplus-tests 的测试属性，用于使用测试套件进行规范性用例测试
Promise.deferred = function () {
    let dfd = {}

    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })

    return dfd;
}

Promise.all = function (promiseList) {

    return new Promise((resolve, reject) => {
        let resList = [];

        let handlePromiseData = function (index, data) {
            resList[index] = data;

            if (resList.length === promiseList.length) {
                resolve(resList)
            }
        }

        promiseList.forEach((p, pIndex) => {
            if (isPromise(p)) { // Promise处理
                p.then(data => {
                    handlePromiseData(pIndex, data)
                }, err => {
                    reject(err);
                })
            } else { // 普通值处理
                handlePromiseData(pIndex, p)
            }
        })
    })
}


Promise.race = function (promiseList) {
    return new Promise((resolve, reject) => {
        promiseList.forEach((p) => {
            if (isPromise(p)) { // Promise处理
                p.then(data => {
                    resolve(data)
                }, err => {
                    reject(err);
                })
            } else { // 普通值处理
                resolve(p)
            }
        })
    })
}


module.exports = Promise;