// 可选的，可以不传，是一种校验规则
const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        age: {
            type: 'number'
        }
    },
    // 是否允许追加参数
    additionalProperties: false
}

function bannerLoader (content) {
    const options = this.getOptions(schema)
    console.log(options, 'options')
    const title = `
    /**
     * name: ${options.name}
     * age: ${options.age}
     **/
    `
    this.callback(null, title + content)
}

module.exports = bannerLoader