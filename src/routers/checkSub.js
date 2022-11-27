const url = require('url');

async function checkSub(req, res) {
    const q = url.parse(req.body, true)

    console.log(q)
    console.log()
    //JSON.parse(rawStr.slice(1, rawStr.length - 1))
    //console.log(JSON.parse(req.rawBody))
    //console.log(req.body.merchantAccount)
    //console.log(req.body.orderReference)
    //console.log(req.body.merchantSignature)
    //console.log(payObj.amount)
    //console.log(payObj.processingDate)
    //console.log(payObj.transactionStatus)
    //console.log(payObj.value)

    //console.log(req)



    //const obj = JSON.parse(JSON.stringify(req.body))
    //console.log('Our object' + obj)

    //console.log(obj[merchantAccount])

    //const payInf = JSON.parse(JSON.stringify(req.body))
    //console.log(Object.keys(payInf))
    //console.log(Object.values(payInf))
    //const payObj = JSON.parse(payInf)

    //const str1 = Object.keys(req.body)[0] + '[]}'
    //const payObj1 = JSON.parse(str1)



    //console.log(Object.values(req.body))
    //const str2 = Object.values(req.body)
    //const fStr2 = Object.keys(str2)
    //const payObj2 = JSON.parse(fStr2)
    //console.log(payObj2)


    //const str2 = Object.keys(req.body)
    //const payObj2 = JSON.parse(str2)
    //console.log(payObj2)

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


    //console.log(pay ["merchantAccount"])
    //console.log(pay.orderReference)
    //console.log(payInf.merchantSignature)
    //console.log(payInf.amount)
    //console.log(payInf.processingDate)
    //console.log(payInf.transactionStatus)
    //console.log(payInf.value)


    //res.json({
    //    "orderReference": req.body.orderReference,
    //     "status": "accept",
    //     "time": time,
    //     "signature": "",
    //})
    res.end()
}


module.exports = checkSub

