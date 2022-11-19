

async function checkSub(req, res) {
    console.log(req)
    console.log(req.body.merchantAccount)

    res.end()
}


module.exports = checkSub

