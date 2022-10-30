const express = require('express')
const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(`Фулл тіло запиту ${req.body}`)

    console.log(`Мерчант ${req.body.merchantAccount}`)
    console.log(`Номер ${req.body.orderReference}`)
    console.log(`Сигнатура ${req.body.merchantSignature}`)
    console.log(`Сумма ${req.body.amount}`)
    console.log(`Час обробки ${req.body.processingDate}`)
    console.log(`Статус оплати ${req.body.transactionStatus}`)
    console.log(`Портал ${req.body.value}`)


    let time = Date.now()

    res.json({
        "orderReference": req.body.orderReference,
         "status": "accept",
         "time": time,
         "signature": "",
    })


}


module.exports = checkSub