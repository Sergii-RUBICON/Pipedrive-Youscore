const createHmac = require('crypto').createHmac
const user = require('../db/user')

async function checkSub(req, res) {

    const obj = JSON.parse(req.rawBody)
    //console.log(req.rawBody)
    //console.log(obj)

    //console.log(`Мерчант: ${obj.merchantAccount}`)
    //console.log(`Номер заказу: ${obj.orderReference}`)
    //console.log(`Код авторизації: ${obj.authCode}`)
    console.log(`Назва продукта: ${obj.products[0].name}`)
    console.log(`Ціна продукдта: ${obj.products[0].price}`)
    console.log(`Кількість продукта: ${obj.products[0].count}`)
    console.log(`Назва кастом поля: ${obj.clientFields[0].name}`)
    console.log(`Портал: ${obj.clientFields[0].value}`)

    let resObj = {
        orderReference: obj.orderReference,
        status: "accept",
        time: Date.now(),
        signature: "",
    }
    console.log(resObj)
    const resHMC5 = await hmacmd5(resObj)
    console.log(resHMC5)

    const userSub = await user.findUserByPortal(obj.clientFields[0].value)
    console.log(userSub.subscription_end)
    const userSubDate = userSub.subscription_end
    const userSec = Date.parse(userSubDate)
    console.log(userSec)
    const userPlusDate = userSec + 2629800000

    const timestamp = new Date(userPlusDate)

    console.log(userPlusDate)

    await user.findOneAndUpdateStatusTime(obj.clientFields[0].value, timestamp)
    res.end(resHMC5)
}


async function hmacmd5(string, secret = '59d84bc4cc1c61ea961c75688dd9105eb852128b') {
    const hash = createHmac('md5',secret)
        .update(string+";")
        .digest('hex');
    return hash
}


module.exports = checkSub


/*
606f
 */

