const createHmac = require('crypto').createHmac
const user = require('../db/user')

async function checkSub(req, res) {
    const obj = JSON.parse(req.rawBody)
    console.log(obj)

    if (obj.transactionStatus === 'Approved') {

        const userSub = await user.findUserByPortal(obj.clientFields[0].value)
        const calculateSub = await calculateDate(obj.products[0].name, userSub.subscription_end)
        await user.findOneAndUpdateStatusTime(obj.clientFields[0].value, calculateSub)

        let resObj = {
            orderReference: obj.orderReference,
            status: "accept",
            time: Date.now(),
            signature: "",
        }
        console.log(resObj)
        const resHMC5 = await hmacmd5(resObj)
        console.log(resHMC5)

        res.end(resHMC5)
    } else {
        res.end()
    }
}



async function hmacmd5(string, secret = '59d84bc4cc1c61ea961c75688dd9105eb852128b') {
    const hash = createHmac('md5',secret)
        .update(string+";")
        .digest('hex');
    return hash
}


async function calculateDate (subType, time) {
    const parsedTime = Date.parse(time)
    if (subType === 'Тестовий товар, 1 рік') {
        const sub = parsedTime + 31536000000
        return new Date(sub)
    }
    else if (subType === 'Тестовий товар, 1 місяць') {
        const sub = parsedTime +  2629800000
        return new Date(sub)
    }
}
module.exports = checkSub


/*
606f
 */

