
async function checkSub(req, res) {

    const obj = JSON.parse(req.rawBody)
    console.log(req.rawBody)
    console.log(obj)

    console.log(obj.merchantAccount)
    console.log(obj.orderReference)
    console.log(obj.authCode)
    console.log(obj.products[0].name)
    console.log(obj.products[0].price)
    console.log(obj.clientFields[0].name)
    console.log(obj.clientFields[0].value)

    res.json({
        orderReference: obj.orderReference,
        status: "accept",
        time: Date.now(),
        signature: obj.merchantSignature,
    })
    res.end()
}


module.exports = checkSub

