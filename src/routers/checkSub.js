const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(req, res) {
    const payInfo1st = JSON.stringify(req.body)
    const payInfo2st = JSON.parse(payInfo1st)

    console.log(`Інформація про платіж: ${payInfo1st}`)
    console.log(`Інформація про платіж: ${payInfo2st.body}`)
    console.log(`Інформація про платіж: ${payInfo2st.value}`)
    res.end()
    //res.send({
    //    orderReference: req.body.orderReference,
    //    status: 'accept',
    //    time: Date.now(),
    //})
}


module.exports = checkSub