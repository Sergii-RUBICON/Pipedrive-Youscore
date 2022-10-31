const express = require('express')
const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(JSON.stringify(req.body))
    const payInf = unescape(JSON.parse(JSON.stringify(req.body)));
    console.log(JSON.stringify(payInf))

    console.log(payInf.merchantAccount)
    console.log(payInf.orderReference)
    console.log(payInf.merchantSignature)
    console.log(payInf.amount)
    console.log(payInf.processingDate)
    console.log(payInf.transactionStatus)
    console.log(payInf.value)

    /*
    const str = Object.keys(req.body)[0] + '[]}'
    const payInf = JSON.parse(str)
    console.log(payInf)


    console.log(req.body.merchantAccount)
    console.log(req.body.orderReference)
    console.log(req.body.merchantSignature)
    console.log(req.body.amount)
    console.log(req.body.processingDate)
    console.log(req.body.transactionStatus)
    console.log(req.body.value)
    */

    //res.json({
    //    "orderReference": req.body.orderReference,
    //     "status": "accept",
    //     "time": time,
    //     "signature": "",
    //})
    res.end()


}


module.exports = checkSub