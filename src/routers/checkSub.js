

async function checkSub(req, res) {
    const payIn = req.body
    console.log(payIn[0])

    res.end()
}


module.exports = checkSub

