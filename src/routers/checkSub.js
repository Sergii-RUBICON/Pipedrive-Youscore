

async function checkSub(req, res) {

    let dummyString = JSON.stringify(req.body)
    let finalString = dummyString.replaceAll('"', '')
    console.log("original string: " + dummyString)
    console.log("final string: " + finalString)
    const obj = JSON.parse(finalString)
    console.log("FINAL OBJ" + obj)

    res.end()
}


module.exports = checkSub

