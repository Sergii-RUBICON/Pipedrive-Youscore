

async function checkSub(req, res) {
    console.log(req)
    let strObj = JSON.parse(JSON.stringify(req.body))
    console.log(strObj)
    const obj = strObj.toString().replace(/"/g)
    console.log(obj)

    res.end()
}


module.exports = checkSub

