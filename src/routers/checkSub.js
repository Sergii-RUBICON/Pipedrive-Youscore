

async function checkSub(req, res) {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const payInf = JSON.parse(JSON.stringify(req.body))
    //const payObj = JSON.parse(payInf)


    //const twice_json = req.body
    //const json = JSON.parse(twice_json)
    //const obj = JSON.parse(json)
    //console.log(obj.merchantAccount)

    //console.log(payObj.merchantAccount)
    //console.log(payObj.orderReference)
    //console.log(payObj.merchantSignature)
    //console.log(payObj.amount)
    //console.log(payObj.processingDate)
    //console.log(payObj.transactionStatus)
    //console.log(payObj.value)


    //const str = Object.keys(req.body)[0] + '[]}'
    //const payInf = JSON.parse(str)
    //console.log(payInf)


    console.log(payInf ["merchantAccount"])
    console.log(payInf[0].orderReference)
    console.log(payInf[0].merchantSignature)
    console.log(payInf[0].amount)
    console.log(payInf[0].processingDate)
    console.log(payInf[0].transactionStatus)
    console.log(payInf[2].value)


    //res.json({
    //    "orderReference": req.body.orderReference,
    //     "status": "accept",
    //     "time": time,
    //     "signature": "",
    //})
    res.end()
}


module.exports = checkSub