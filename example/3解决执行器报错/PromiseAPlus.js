const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

class Promise {
    constructor (executor) {
        this.status = PENDING;

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULLFILED;
                this.value = value;           
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
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
    }
}

module.exports = Promise;