module.exports = function pCall (object, methodName, ...args) {
    return new Promise((resolve, reject) => {
        object[methodName](...args, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}
