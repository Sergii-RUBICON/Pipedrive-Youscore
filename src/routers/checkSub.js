

async function checkSub(req, res) {
    console.log(req)
    let strObj = JSON.parse(JSON.stringify(req.body))
    console.log(strObj)
    strObj.replace(/"/g)
    console.log(strObj)

    res.end()
}


module.exports = checkSub

