module.exports.getPrefix = function(contentTable) {
    // 遍历，给每一个 item 生成 prefix，使用 currentPrefix
    // currentPrefix 的构造:
    // 第一项为1.
    // 当 item.rank 大于前者，大了几，在末尾加上几个"1."，比如大1的话，1.变成1.1.
    // 当 item.rank 等于前者，将currentPrefix的倒数第二位“加1”，比如1.1.变成1.2.
    // 当 item.rank 小于前者，小了几，将currentPrefix的'x.'去掉几次，再将currentPrefix的倒数第二位“加1”, 比如小1， 效果为1.2.变成2.

    var currentPrefix = '1.'
    contentTable.forEach(function(item, index, array) {
        if (index === 0) {
            return
        }
        if (index === 1) {
            item.prefix = currentPrefix
            return
        }

        var diff = item.rank - array[index-1].rank
        if (diff > 0) {
            for (var i = 0; i < diff; i++) {
                currentPrefix += '1.'
            }
        }
        if (diff === 0) {
            currentPrefix = secendLastCharAdd1(currentPrefix)
        }
        if (diff < 0) {
            for (var j = 0; j < -diff; j++) {
                // 将currentPrefix的'x.'去掉几次, 先要获取'x.'之前的'.'的 index
                var indexOfPoint = currentPrefix.lastIndexOf('.', currentPrefix.length - 2)
                currentPrefix = currentPrefix.slice(0, indexOfPoint + 1)
            }
            currentPrefix = secendLastCharAdd1(currentPrefix)
        }
        item.prefix = currentPrefix
    })

    function secendLastCharAdd1(str) {
        var numberStr = str.charAt(str.length-2)
        var newNumberStr = (Number(numberStr) + 1).toString()
        return str.slice(0, str.length-2) + newNumberStr + str.charAt(str.length-1)
    }
}
