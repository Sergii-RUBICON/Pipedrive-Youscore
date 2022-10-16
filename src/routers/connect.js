const api = require('../api')
const User = require('../db/user')

//### Load result after save api key youscore to DB ###\\
async function connect(req, res) {
    console.log('request to getCode')
    const code = req.body.code

    try {
        if (!code) {
            res.render('main', {
                status: 'https://cdn.glitch.global/1d4ff4b4-546b-4de3-9408-e43a3306387e/status-not_connexted.svg?v=1661638740973',
                display: 'none',
            })
        }
        const response = await api.checkConnect(code)
        console.log(response)

        if (typeof response === 'object') {
            const key = await User.findYKeyByPortal(process.env.companyDomain)
            if (!key) {
                await User.updateDBKey(process.env.companyDomain, code)
            }
            else if (key) {
                await User.findYKeyByPortalAndUpdate(process.env.companyDomain, code)
            }
            res.render('main', {
                status: 'https://cdn.glitch.global/1d4ff4b4-546b-4de3-9408-e43a3306387e/status-connected.svg?v=1661638736324',
                display: 'block',
                code: code,
            })

        } else {
            res.render('main', {
                status: 'https://cdn.glitch.global/1d4ff4b4-546b-4de3-9408-e43a3306387e/status-not_connexted.svg?v=1661638740973',
                display: 'none',
            })
        }}
    catch(e) {
        console.log(e)
        res.render('main', {
            status: 'https://cdn.glitch.global/1d4ff4b4-546b-4de3-9408-e43a3306387e/status-not_connexted.svg?v=1661638740973',
            display: 'none',
        })
    }
}

module.exports = connect