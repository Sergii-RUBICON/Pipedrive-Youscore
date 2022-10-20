const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(`Інфо про портал: ${JSON.parse(JSON.stringify(req.body))}`)
    res.send({
        orderReference: req.body.orderReference,
        status: 'accept',
        time: Date.now(),
    })
}


module.exports = checkSub