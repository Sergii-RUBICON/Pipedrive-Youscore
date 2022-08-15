const api = require('../api')
const User = require('../db/user')

//### Load result after save api key youscore to DB ###\\
async function connect(req, res) {
    console.log('request to getCode')
    const code = req.body.code
    try {

        if (!code) {
            res.render('main', {
                status: 'Поле не може бути пустим'
            })
        }
        const response = await api.checkConnect(code)
        console.log(response)
        if (typeof response === 'object') {
            await User.updateDBKey(globalThis.companyDomain, code)
            res.render('main', {
                status: 'Підключено та збережено'
            })
        } else {
            res.render('main', {
                status: 'Ключ не вірний'
            })
        }}
    catch(e) {
        console.log(e)
        res.render('main', {
            status: 'Помилка при підкюченні',
        })
    }
}

module.exports = connect