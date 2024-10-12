const babel = require('@babel/core')

function babelLoader (content) {
    // 使用异步的钩子
    const callback = this.async()
    const options = this.getOptions()
    babel.transform(content, options, function(err, result) {
        if(err) {
            callback(err)
        } else {
            callback(null, result.code)
        }
    })
}

module.exports = babelLoader