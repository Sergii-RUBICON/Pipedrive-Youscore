const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const payInf = JSON.parse(req.body)
    console.log(`Інформація про платіж: ${payInf}`)
    console.log(`Інфо про портал: ${payInf.value}`)
    res.send({
        orderReference: req.body.orderReference,
        status: 'accept',
        time: Date.now(),
    })
}


module.exports = checkSub