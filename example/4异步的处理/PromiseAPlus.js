const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

class Promise {
    constructor (executor) {
        this.status = PENDING;

        this.onfulfilledArrCb = []; // 成功需要执行的队列
        this.onrejectArrCb = []; // 失败需要执行的队列

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULLFILED;
                this.value = value;

                // 订阅列表执行
                this.onfulfilledArrCb.forEach(fn => { // 依次取出执行
                    fn()
                })  
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;

                // 订阅列表执行
                this.onrejectArrCb.forEach(fn => { // 依次取出执行
                    fn()
                })  
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err); // 当作执行失败执行reject
        }
        
    }

    then (onfulfilled, onreject) {
        if (this.status === FULLFILED) { 
            onfulfilled(this.value)
        };

        if (this.status === REJECTED) {
            onreject(this.reason);
        }

        if (this.status === PENDING) { // 异步时状态还未由PENDING转移到FULLFILED或者REJECTED，于是我们想个办法先把需要执行的函数存起来

            // 存放成功的回调
            let onfulfilledfn = () => {
                onfulfilled(this.value)
            }
            this.onfulfilledArrCb.push(onfulfilledfn);

            // 存放失败的回调
            let onrejectfn = () => {
                onreject(this.reason)
            }

            this.onrejectArrCb.push(onrejectfn);
        }
    }
}

module.exports = Promise;