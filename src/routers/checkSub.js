const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const payInf = JSON.parse(JSON.stringify(req.body))
    console.log(`Інфо про портал: ${payInf.orderReference}`)

    res.send({
        orderReference: req.body.orderReference,
        status: 'accept',
        time: Date.now(),
    })
}


module.exports = checkSub