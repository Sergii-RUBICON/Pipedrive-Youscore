const createHmac = require('crypto').createHmac
const user = require('../db/user')

async function checkSub(req, res) {
    const obj = JSON.parse(req.rawBody)
    console.log(obj)

    const userSub = await user.findUserByPortal(obj?.clientFields[0]?.value)
    const time = Date.now()

    if (userSub) {
        if (obj.transactionStatus === 'Approved') {
            console.log('Starting update sub date')
            const calculateSub = await calculateDate(obj.products[0].name, userSub.subscription_end)
            await user.findOneAndUpdateStatusTime(obj.clientFields[0].value, calculateSub)

            const str1 = obj.orderReference + ";" + "accept" + ";" + time
            console.log(str1)

            const md5Str = await hmacmd5(str1)
            console.log(md5Str)

            const resObj = {
                orderReference: obj.orderReference,
                status: "accept",
                time: time,
                signature: md5Str,
            }
            console.log(resObj)
            res.json(resObj)
        } else {
            const str2 = obj.orderReference + ";" + "accept" + ";" + time
            console.log(str2)
            const md5Str = await hmacmd5(str2)
            console.log(md5Str)

            const resObj = {
                orderReference: obj.orderReference,
                status: "accept",
                time: time,
                signature: md5Str,
            }
            console.log(resObj)
            res.json(resObj)
        }
    } else if (!userSub) {
        console.log('Value on custom field not correct, pls try again')

        const str3 = obj.orderReference + ";" + "accept" + ";" + time
        console.log(str3)
        const md5Str = await hmacmd5(str3)
        console.log(md5Str)

        const resObj = {
            orderReference: obj.orderReference,
            status: "accept",
            time: time,
            signature: md5Str,
        }
        console.log(resObj)
        res.json(resObj)
    }
}



async function hmacmd5(string, secret = '59d84bc4cc1c61ea961c75688dd9105eb852128b') {
    const hash = createHmac('md5',secret)
        .update(string)
        .digest('hex');
    return hash
}


async function calculateDate (subType, time) {
    const parsedTime = Date.parse(time)
    if (subType === '???????????????? ??????????, 1 ??????') {
        const sub = parsedTime + 31536000000
        return new Date(sub)
    }
    else if (subType === '???????????????? ??????????, 1 ????????????') {
        const sub = parsedTime +  2629800000
        return new Date(sub)
    }
}
module.exports = checkSub


//3518
//94a9