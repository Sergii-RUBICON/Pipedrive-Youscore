const express = require('express')
const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const payInf = JSON.parse(req.body)
    console.log(req.payInf)

    console.log(payInf.merchantAccount)
    console.log(payInf.orderReference)
    console.log(payInf.merchantSignature)
    console.log(payInf.amount)
    console.log(payInf.processingDate)
    console.log(payInf.transactionStatus)
    console.log(payInf.value)


    let time = Date.now()

    res.json({
        "orderReference": req.body.orderReference,
         "status": "accept",
         "time": time,
         "signature": "",
    })


}


module.exports = checkSub