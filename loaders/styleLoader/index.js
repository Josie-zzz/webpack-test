module.exports = function(content, map, meta) {
}

module.exports.pitch = function(remainingRequest) {
    console.log(remainingRequest, 'remainingRequest')
    // 将绝对路径转换为相对路径
    let pathAbsolute = remainingRequest.split('!')
    pathAbsolute = pathAbsolute.map(path => {
        return this.utils.contextify(this.context, path)
    })
    console.log(pathAbsolute, 'pathAbsolute')
    // 转换完再次拼接
    const pathRelative = pathAbsolute.join('!')
    // 导入 style
    return `
        import style from '!!${pathRelative}'
        // console.log(style, style.toString())
        let styleTag = document.createElement('style');
        styleTag.innerHTML = style
        document.head.appendChild(styleTag)
    `
}