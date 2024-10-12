/**
 * 打包输出前清楚文件内容，在 webpack5 中内置了此插件，设置clean：true 即可
 */
class CleanWebpackPlugin {
    apply (compiler) {
        compiler.hooks.emit.tap('CleanWebpackPlugin', (compilation) => {
            this.compiler = compiler
            debugger
            // 拿到自己的配置项
            const outputPath = compiler.options.output.path
            // webpack提供的文件操作方法
            const fs = compiler.outputFileSystem
            this.removeFile(fs, outputPath)
        })
    }
    // 这是参考文档写的，不够好，我试了，如果路径换了就会报错，因为找不到相关的文件，如果要实现类似内置的功能
    // 感觉还得考虑相对路径解析，判断路径是否有效等情况
    removeFile(fs, filePath) {
        // 读取目录下的文件和文件夹
        const files = fs.readdirSync(filePath)
        files.forEach(file => {
            // 拼接文件路径
            const path = `${filePath}/${file}`
            const fileStat = fs.statSync(path)
            // 判断是不是文件夹，如果是文件夹就递归遍历里面的文件删除，否则直接删除文件
            if(fileStat.isDirectory()) {
                this.removeFile(fs, path)
            } else {
                fs.unlinkSync(path)
            }
        })
    }
}

module.exports = CleanWebpackPlugin