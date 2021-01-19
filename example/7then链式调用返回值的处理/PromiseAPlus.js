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

        let Promise2 = new Promise((resolve, reject) => {
                if (this.status === FULLFILED) { 

                    try {
                        let x = onfulfilled(this.value); // 捕获异常，传递异常给新实例进行reject
                        resolve(x);
                    } catch(e) {
                        reject(e)
                    }
                };
        
                if (this.status === REJECTED) {

                    try {
                        let y = onreject(this.reason);// 捕获异常，传递异常给新实例进行reject
                        reject(y); 
                    } catch(e) {
                        reject(e)
                    }
                }
        
                if (this.status === PENDING) {
        
                    let onfulfilledfn = () => {
                        try {
                            let x = onfulfilled(this.value); // 捕获异常，传递异常给新实例进行reject
                            resolve(x);
                        } catch(e) {
                            reject(e)
                        }
                    }
                    this.onfulfilledArrCb.push(onfulfilledfn);
        
                    let onrejectfn = () => {
                        try {
                            let y = onreject(this.reason); // 捕获异常，传递异常给新实例进行reject
                            reject(y); 
                        } catch(e) {
                            reject(e)
                        }
                    }
        
                    this.onrejectArrCb.push(onrejectfn);
                }
        });

        return Promise2;
    }
}

module.exports = Promise;