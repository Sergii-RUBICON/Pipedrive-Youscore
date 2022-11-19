

async function checkSub(req, res) {

    let dummyString = JSON.stringify(req.body)
    let finalString = dummyString.replaceAll('"', '')
    console.log("original string: " + dummyString)
    console.log("final string: " + finalString)

    res.end()
}


module.exports = checkSub

