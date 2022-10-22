const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    //const payInf = JSON.parse(req.body)
    const str = Object.keys(req.body)[0] + '[]}'
    const payInf = JSON.parse(str)
    console.log(`Інфо про портал: ${payInf.orderReference}`)
    console.log(`Інфо про портал: ${payInf}`)
    res.send({
        orderReference: payInf.orderReference,
        status: 'accept',
        time: Date.now(),
    })
}


module.exports = checkSub