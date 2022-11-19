

async function checkSub(req, res) {
    console.log(req)
    const strObj = JSON.parse(JSON.stringify(req.body))
    console.log(strObj)
    const obj = strObj.replace(/"/g, '')
    console.log(obj)

    res.end()
}


module.exports = checkSub

