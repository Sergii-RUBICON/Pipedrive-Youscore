const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const payInf = JSON.parse(req.body)
    console.log(`Інфо про портал: ${req.body}`)
    console.log(`Інфо про портал: ${payInf.orderReference}`)
    res.send({
        orderReference: req.body.orderReference,
        status: 'accept',
        time: Date.now(),
    })
}


module.exports = checkSub