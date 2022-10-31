

async function checkSub(req, res) {
    console.log(JSON.parse(JSON.stringify(req.body)))
    const payInf = JSON.parse(JSON.stringify(req.body))
    const payObj = JSON.stringify(payInf)

    const pay = JSON.stringify(payInf)

    function fn(pay) {
        let str = ''

        const left = Object.keys(pay)
        str += left[0]

        let products = Object.values(pay)
        str += '['

        while (Object.values(products).length) {
            if (Object.keys(products[0])[0]) str += Object.keys(products[0])[0] + ','

            products = Object.values(products[0])
        }

        str = str.slice(0, -1)

        str += ']'
        str += '}'

        return str
    }
    fn(pay)
    console.log(fn(pay))

    //const twice_json = req.body
    //const json = JSON.parse(twice_json)
    //const obj = JSON.parse(json)
    //console.log(obj.merchantAccount)

    console.log(payObj.merchantAccount)
    console.log(payObj.orderReference)
    console.log(payObj.merchantSignature)
    console.log(payObj.amount)
    console.log(payObj.processingDate)
    console.log(payObj.transactionStatus)
    console.log(payObj.value)

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