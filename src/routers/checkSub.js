const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    console.log(`Інформація про платіж: ${JSON.parse(req.body)}`)
    console.log(`Інфо про портал: ${req.body.value}`)
    res.end()
    //res.send({
    //    orderReference: req.body.orderReference,
    //    status: 'accept',
    //    time: Date.now(),
    //})
}


module.exports = checkSub