const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    constructor (executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;

        let resolve = (value) => {
            this.value = value;
            this.status = RESOLVED;
        }
        let reject = (reason) => {
            this.reason = reason;
            this.status = REJECTED
        }
        executor(resolve, reject);

    }
    then () {
    }
}

module.exports = {
    Promise
};