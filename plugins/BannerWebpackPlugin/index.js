/**
 * 给最终输出的文件添加注释
 */
class BannerWebpackPlugin {
    constructor(options = {}) {
        // 存储输入的参数
        this.options = options
    }

    apply(compiler) {
        // debugger
        compiler.hooks.emit.tap('BannerWebpackPlugin', (compilation) => {
            // 获取即将输出的资源
            const { assets } = compilation
            // 过滤资源，只给 .js 文件加
            const filterArr = Object.keys(assets).filter(val => !!val.match(/\.js$/))

            // 生成注释
            const comment = `/** name: ${this.options.name || 'xxx'}
  * age: ${this.options.age || 'xxx'}
  * special: here
**/
`

            // 遍历并给资源增加内容
            filterArr.forEach(name => {
                // 获取资源内容并拼接
                const asset = assets[name].source()
                const newData = comment + asset
                // 重新定义 source 方法
                assets[name] = {
                    source() {
                        return newData
                    },
                    size() {
                        return newData.length
                    }
                }
            })
        })
    }
}

module.exports = BannerWebpackPlugin
