const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    constructor (executor) {
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
    then (onfulfilled, onreject) {

        let Promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                let x = onfulfilled && onfulfilled(this.value); // x的值类型需要判断：普通值还是Promise
                resolve(x)
            }
    
            if (this.status === REJECTED) {
                let y = onreject && onreject(this.reason);
                reject(y);
            }
    
            if (this.status === PENDING) {
    
                // 如果是异步，就先订阅好
                onfulfilled && this.onfulfilledArr.push(() => {// 这样套一层方便做切片加入自定义逻辑
                    onfulfilled(this.value)
                });
    
                onreject && this.onrejectArr.push(() => { // 这样套一层方便做切片加入自定义逻辑
                    onreject(this.reason)
                })
            }

        })

        return Promise2;
    }
}

module.exports = {
    Promise
};