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
        executor(resolve, reject);

    }
    then () {
    }
}

module.exports = {
    Promise
};