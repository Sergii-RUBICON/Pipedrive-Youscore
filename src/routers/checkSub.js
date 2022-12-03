const createHmac = require('crypto').createHmac

async function checkSub(req, res) {

    const obj = JSON.parse(req.rawBody)
    console.log(req.rawBody)
    console.log(obj)

    console.log(`Мерчант: ${obj.merchantAccount}`)
    console.log(`Номер заказу: ${obj.orderReference}`)
    console.log(`Код авторизації: ${obj.authCode}`)
    console.log(`Назва продукта: ${obj.products[0].name}`)
    console.log(`Ціна продукдта: ${obj.products[0].price}`)
    console.log(`Кількість продукта: ${obj.products[0].count}`)
    console.log(`Назва кастом поля: ${obj.clientFields[0].name}`)
    console.log(`Портал: ${obj.clientFields[0].value}`)

    let resObj = {
        orderReference: obj.orderReference,
        status: "accept",
        time: Date.now()
    }
    console.log('Res obj: ' + resObj)
    resObj = resObj.toString()
    console.log('Res str' + resObj)

    res.end()
}


//async function hmacmd5(string, secret = '59d84bc4cc1c61ea961c75688dd9105eb852128b') {
//    const hash = createHmac('md5',secret)
//        .update(string+";")
//        .digest('hex');
//    return hash
//}


module.exports = checkSub

