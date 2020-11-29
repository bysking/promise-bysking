const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    constructor (executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        let resolve = (value) => {
            if (this.status === PENDING) { // 状态pending才能修改状态
                this.value = value;
                this.status = RESOLVED;
            }
        }
        let reject = (reason) => {

            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err); // 执行时发生错误，报错等同于调用reject
        }

    }
    then () {
    }
}

module.exports = {
    Promise
};