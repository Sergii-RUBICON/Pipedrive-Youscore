const express = require('express')
const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {

    const encoding = express.json({
        limit: '5mb',
        verify: (req, res, buf) => {
            req.rawBody = buf.toString()
        },
    },
);
    console.log(encoding)
    /*
    const str = Object.keys(req.body)[0] + '[]}'
    const payInf = JSON.parse(str)
    console.log(`Інфо: ${Object.values(req.body)}`)
    console.log(JSON.stringify(payInf))
    console.log(`Номер товару: ${payInf.orderReference}`)
    console.log(`Назву товару: ${payInf.merchantAccount}`)
    console.log(`Портал: ${payInf.value}`)
    console.log(`Сума оплати: ${payInf.amount}`)
    console.log(`Код відповіді: ${payInf.reasonCode}`)
    console.log(`Статус відповідіь: ${payInf.reason}`)
    console.log(`Час обробки: ${payInf.processingDate}`)
    */
    let time = Date.now()

    res.json({
        "orderReference": payInf.orderReference,
        "status": "accept",
        "time": time,
        "signature": "",
        })
}


module.exports = checkSub