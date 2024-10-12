/**
 * 分析文件的输出
 */
class AnalyzeWebpackPlugin {
    constructor(options = {}) {
        this.options = options
    }

    apply(compiler) {
        compiler.hooks.emit.tap('AnalyzeWebpackPlugin', (compliaction) => {
            // 首先得先拿到每个文件以及他们的大小
            const assetMap = Object.entries(compliaction.assets).map(([name, file]) => {
                return {
                    name,
                    size: Math.ceil(file.size() / 1024)
                }
            })
            console.log(assetMap)
            // 降序
            assetMap.sort((a, b) => b - a)
            // 然后写点 md 的字符串
            let content = `| filename | size |
| --- | --- |        
`  
            assetMap.forEach((value) => {
                content = content + `| ${value.name} | ${value.size}kb |\n`
            })

            compliaction.assets['analyzeFile.md'] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
        })
    }
}

module.exports = AnalyzeWebpackPlugin