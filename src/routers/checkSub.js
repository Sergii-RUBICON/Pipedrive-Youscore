const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const payInfo = JSON.stringify(req.body)
    console.log(`Інформація про платіж: ${JSON.parse(payInfo)}`)
    res.end()
    //res.send({
    //    orderReference: req.body.orderReference,
    //    status: 'accept',
    //    time: Date.now(),
    //})
}


module.exports = checkSub