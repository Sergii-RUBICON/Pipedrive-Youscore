

async function checkSub(req, res) {
    console.log(req)
    console.log(req.body)
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log(obj)
    res.end()
}


module.exports = checkSub

