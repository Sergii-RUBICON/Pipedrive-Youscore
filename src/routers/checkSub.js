const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const str = Object.keys(req.body)[0] + '[]}'
    const payInf = JSON.parse(str)
    console.log(`Інфо про номер товару: ${payInf.orderReference}`)

    res.send(JSON.parse({
        orderReference: payInf.orderReference,
        status: "accept",
        time: Date.now(),
        signature: "",
        }))
}


module.exports = checkSub