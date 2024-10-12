class DefineWebpackPlugin {
    constructor(options){
        this.options = options
    }
    // 将对象转换为等式的代码，注意把值转换成字符串
    objTokv(obj = {}) {
        // 这里要注意，key 赋值给 window 对象
        return Object.entries(obj).map(val => `window.${val[0]} = ${JSON.stringify(val[1])};\n`).join('')
    }

    apply(compiler){
        compiler.hooks.emit.tap('DefineWebpackPlugin', (compilation) => {
            const assets = compilation.assets
            // 找到所有的入口文件
            const entrypoints = compilation.entrypoints
            for(let [key, value] of entrypoints) {
                // 找到相应的chunks
                const chunks = value.chunks
                // 遍历chunks
                chunks.forEach(chunk => {
                    // 找到相关的文件
                    const files = chunk.files
                    const define = this.objTokv(this.options)
                    // debugger
                    // 重新给文件赋值
                    files.forEach(file => {
                        const newContent = define +  assets[file].source()
                        assets[file] = {
                            source() {
                                return newContent
                            },
                            size() {
                                return newContent.length
                            }
                        }
                    })
                })
            }
        })
    }
}

module.exports = DefineWebpackPlugin