function cleanLogLoader (content) {
    return content.replace(/console\.log\(.*;?\)/g, '')
}

module.exports = cleanLogLoader;