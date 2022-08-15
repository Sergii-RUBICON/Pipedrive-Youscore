

require('dotenv').config()

const express = require('express')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth').OAuth2Strategy
const api = require('./src/api')
const config = require('./src/config')
const User = require('./src/db/user')
const connectMongo = require('./src/db/connection')
const fs = require('fs')
const mainRouter = require('./src/routers/main')
const setupExpress = require('./src/setupExpress')

const app = express()

connectMongo.main()

fs.readFile('companyDomain.txt', (err, data) => {
    if (err) {
        globalThis.companyDomain = ''
        return
    }
    globalThis.companyDomain = data.toString()
})

app.use(async (req, res, next) => {
    req.user = await User.findUserByPortal(globalThis.companyDomain)
    next()
})

app.get('/auth/pipedrive', passport.authenticate('pipedrive'))
app.get('/auth/pipedrive/callback', passport.authenticate('pipedrive', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/'
}))

app.use(passport.initialize())

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
            const user = await User.updateUser(
                userInfo.data.company_domain,
                userInfo.data.name,
                accessToken,
                refreshToken
            )

            fs.writeFileSync(filepath, userInfo.data.company_domain)
            globalThis.companyDomain = userInfo.data.company_domain

            done(null, { user })
        }
    )
)



app.set('view engine', 'hbs')

app.use('/', mainRouter)

setupExpress(express)

app.listen(process.env.PORT || 3000, () => console.log(`🟢 App has started. \n🔗 Live URL: https://${process.env.PROJECT_DOMAIN}.glitch.me`))
