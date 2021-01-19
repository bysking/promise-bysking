const PENDING = 'PENDING'; // 等待状态
const FULLFILED = 'FULLFILED'; // 成功状态
const REJECTED = 'REJECTED'; // 拒绝状态

class Promise {
    constructor (executor) {
        this.status = PENDING; // 初始状态

        let resolve = (value) => {
            this.status = FULLFILED;
            this.value = value;
        };

        let reject = (reason) => {
            this.status = REJECTED;
            this.reason = reason;
        }

        executor(resolve, reject); // 立即执行
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