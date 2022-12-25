require('dotenv').config()

//### Requires ###\\
const express = require('express')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy
const api = require('./src/api')
const config = require('./src/config')
const User = require('./src/db/user')
const connectMongo = require('./src/db/connection')
const mainRouter = require('./src/routers/main')
const setupExpress = require('./src/setupExpress')
const fields = require('./src/fields')
const https = require('https');
const http = require('http');
const fs = require('fs');



//### App start ###\\
const app = express()

//### Connect to DB ###\\
connectMongo.main()

fs.readFile('companyDomain.txt', (err, data) => {
    if (err) {
        process.env.companyDomain = ''
        return
    }
    process.env.companyDomain = data.toString()
})

app.use(async (req, res, next) => {
    req.user = await User.findUserByPortal(process.env.companyDomain)
    next()
})


app.get('/auth/pipedrive', passport.authenticate('pipedrive'))
app.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/'
}))

app.use(passport.initialize())

//### New authorization with Pipedrive ###\\
passport.use(
    'pipedrive',
    new OAuth2Strategy({
            authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
            tokenURL: 'https://oauth.pipedrive.com/oauth/token',
            clientID: config.clientID || '',
            clientSecret: config.clientSecret || '',
            callbackURL: config.callbackURL || ''
        },
        async (accessToken, refreshToken, profile, done) => {
            const filepath = 'companyDomain.txt'
            const userInfo = await api.getUser(accessToken);
            const findCollection = await User.findUserByPortal(userInfo.data.company_domain)
            if (!findCollection) {
                await User.updateUser(
                    userInfo.data.company_domain,
                    userInfo.data.name,
                    userInfo.data.company_name,
                    userInfo.data.icon_url,
                    accessToken,
                    refreshToken
                )
                await fields.addNewCustomOrganizationField(accessToken)
                await fields.addNewCustomWebhook()

            } else {
                await User.findUserByPortalAndUpdate(userInfo.data.company_domain, userInfo.data.name, userInfo.data.company_name, userInfo.data.icon_url, accessToken, refreshToken)
            }

            fs.writeFileSync(filepath, userInfo.data.company_domain)
            process.env.companyDomain = userInfo.data.company_domain

            done(null)
        }
    )
)


//### Load main menu ###\\
app.get('/', async (req, res) => {
    try {
        const userInfo = await api.getUser(req.user.access_token);
        console.log(userInfo)
        res.render('start', {
            name: userInfo.data.name,
            companyName: userInfo.data.company_name,
            userIcon: userInfo.data.icon_url
        })
    }
    catch (error) {
        return res.send(error.message)
    }
})


app.get('/main', async (req, res) => {
    try {
        const userInfo = await api.getUser(req.user.access_token)
        const timestamp = await User.findUserByPortal(userInfo.data.company_domain)
        const subDate = await fields.timestampToNormalDate(timestamp.subscription_end)
        const subStatus = await fields.checkSubStatus(timestamp.subscription_end)
        console.log(userInfo)

        const codeDB = await User.findYKeyByPortal(process.env.companyDomain)
        let code

        if (codeDB) {
            code = codeDB.Y_api_key
        }
        else if (codeDB === null || codeDB === undefined) {
            code = "Ключ не занйдено"
        }
        res.render('main', {
            name: userInfo.data.name,
            companyName: userInfo.data.company_name,
            userIcon: userInfo.data.icon_url,
            status: 'https://cdn.glitch.global/1d4ff4b4-546b-4de3-9408-e43a3306387e/status-wait_connect.svg?v=1661638745216',
            display: 'none',
            code: code,
            subEnd: subDate,
            subStatus: subStatus,
            attention: subStatus,
        })
    }
    catch (error) {
        return res.send(error.message)
    }
})


app.get('/end', async (req, res) => {
    try {
        const userInfo = await api.getUser(req.user.access_token)
        const timestamp = await User.findUserByPortal(userInfo.data.company_domain)
        const subDate = await fields.timestampToNormalDate(timestamp.subscription_end, timestamp.subscription_status)
        const subStatus = await fields.checkSubStatus(timestamp.subscription_end)
        console.log(userInfo)
        console.log(userInfo)
        res.render('end', {
            name: userInfo.data.name,
            companyName: userInfo.data.company_name,
            userIcon: userInfo.data.icon_url,
            pipedrive: `https://${process.env.companyDomain}.pipedrive.com`,
            subEnd: subDate,
            subStatus: subStatus,
            attention: subStatus,
        })
    }
    catch (error) {
        return res.send(error.message)
    }
})


app.set('view engine', 'hbs')

app.use('/', mainRouter)

app.use('/public', express.static(__dirname + '/public'))

setupExpress(express)

const cert = fs.readFileSync('cert/cert.pem', 'utf8')
const key = fs.readFileSync('cert/privkey.pem', 'utf8')
const credentials = { cert, key }
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(80)
httpsServer.listen(443, () => console.log(`🟢 App has started.\n🔗 Live URL: https://app.rubicon.tips`))

// app.listen(process.env.PORT || 3000, () => console.log(`🟢 App has started. \n🔗 Live URL: https://app.rubicon.tips`))
