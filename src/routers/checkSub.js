const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')


async function checkSub(request, responce) {
    console.log(`Інформація про платіж: ${request}`)
    console.log(`Інформація про платіж: ${responce}`)
    responce.end()
}


module.exports = checkSub