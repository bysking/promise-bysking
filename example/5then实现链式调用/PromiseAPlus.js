const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

class Promise {
    constructor (executor) {
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

    then (onfulfilled, onreject) {

        // promise实例化的时候执行器会立即执行，于是把原来的代码挪到新的Promise实例的执行器里面
        let Promise2 = new Promise((resolve, reject) => {
                if (this.status === FULLFILED) { 
                    let x = onfulfilled(this.value);
                    resolve(x); // then返回的新的Promise的实例会采用上一次实例的状态和值
                };
        
                if (this.status === REJECTED) {
                    let y = onreject(this.reason);
                    reject(y); // 失败态
                }
        
                if (this.status === PENDING) {
        
                    let onfulfilledfn = () => {
                        let x = onfulfilled(this.value)
                        resolve(x) // 处理异步的成功态
                    }
                    this.onfulfilledArrCb.push(onfulfilledfn);
        
                    let onrejectfn = () => {
                        let y = onreject(this.reason)
                        reject(y);// 处理异步的失败态
                    }
        
                    this.onrejectArrCb.push(onrejectfn);
                }
        });

        return Promise2;
    }
}

module.exports = Promise;