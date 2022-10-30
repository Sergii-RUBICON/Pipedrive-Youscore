const express = require('express')
const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(req.body)
    //unescape(JSON.parse('\\u00253A\\u00252F\\u00252...'));
    const wayJson = req.body
    const json = JSON.parse(wayJson)
    const payInf = JSON.parse(json)
    console.log(payInf)

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


    let time = Date.now()

    res.json({
        "orderReference": req.body.orderReference,
         "status": "accept",
         "time": time,
         "signature": "",
    })


}


module.exports = checkSub