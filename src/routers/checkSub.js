const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    //const payInf = JSON.parse(req.body)
    console.log(JSON.stringify(req.body))
    const str = Object.keys(req.body)[0] + '[]}'
    const payInf = JSON.parse(str)
    console.log(`Інфо: ${Object.values(req.body)}`)
    console.log(`Номер товару: ${payInf.orderReference}`)
    console.log(`Назву товару: ${payInf.merchantAccount}`)
    console.log(`Портал: ${payInf.value1}`)
    console.log(`Сума оплати: ${payInf.amount}`)
    console.log(`Код відповіді: ${payInf.reasonCode}`)
    console.log(`Статус відповідіь: ${payInf.reason}`)
    console.log(`Час обробки: ${payInf.processingDate}`)

    let time = Date.now()

    res.json({
        "orderReference": payInf.orderReference,
        "status": "accept",
        "time": time,
        "signature": "",
        })
}


module.exports = checkSub