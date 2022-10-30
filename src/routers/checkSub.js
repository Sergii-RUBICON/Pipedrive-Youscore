const express = require('express')
const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const str = Object.keys(req.body)[0] + ''
    const payInf = JSON.parse(str)
    console.log(str)

    console.log(payInf.merchantAccount)
    console.log(payInf.orderReference)
    console.log(payInf.merchantSignature)
    console.log(payInf.amount)
    console.log(payInf.processingDate)
    console.log(payInf.transactionStatus)
    console.log(payInf.value)

    res.json({
        orderReference: req.body.orderReference,
        status: "accept",
        time: Date.now(),
        signature: payInf.merchantSignature,
    })


}


module.exports = checkSub