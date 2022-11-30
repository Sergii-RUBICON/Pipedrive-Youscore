
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

    res.json({
        orderReference: obj.orderReference,
        status: "accept",
        time: Date.now(),
        signature: obj.merchantSignature,
    })
    res.end()
}


module.exports = checkSub

