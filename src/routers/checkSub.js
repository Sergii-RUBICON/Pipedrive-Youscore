

async function checkSub(req, res) {
    console.log(req)
    const obj = JSON.parse(JSON.stringify(req.body))
    console.log(obj)
    const obj2 = JSON.parse(JSON.stringify(obj))
    console.log(obj2)
    res.end()
}


module.exports = checkSub

