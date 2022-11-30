
async function checkSub(req, res) {

    const obj = JSON.parse(req.rawBody)
    console.log(req.rawBody)
    console.log(obj)

    res.json({
        orderReference: obj.orderReference,
        status: "accept",
        time: Date.now(),
        signature: "",
    })
    res.end()
}


module.exports = checkSub

