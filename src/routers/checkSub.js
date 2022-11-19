

async function checkSub(req, res) {
    console.log(req)
    //let strObj = JSON.parse(JSON.stringify(req.body))
    //console.log(strObj)
    //let obj = strObj.toString().replace(/"/g)
    //const obj2 = JSON.parse(JSON.stringify(obj))
    //console.log(obj2)

    res.end()
}


module.exports = checkSub

