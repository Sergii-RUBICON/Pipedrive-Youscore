const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    //const payInf = JSON.parse(req.body)
    const str = Object.keys(req.body)[0] + '[]}'
    const payInf = JSON.parse(str)
    console.log(`Інфо про номер товару: ${payInf.orderReference}`)
    console.log(`Інфо про назву товару: ${payInf.merchantAccount}`)
    console.log(`Інфо про портал: ${payInf.value}`)
    console.log(`Інфо про код відповіді: ${payInf.reasonCode}`)
    console.log(`Інфо про відповідіь: ${payInf.reason}`)
    console.log(`Інфо про час обробки: ${payInf.processingDate}`)

    res.json({
        orderReference: payInf.orderReference,
        status: "accept",
        time: Date.now(),
        signature: "",
        })
}


module.exports = checkSub