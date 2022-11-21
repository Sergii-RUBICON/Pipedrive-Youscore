const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const checkWebhook = require('./checkWebhook')
const connectRouter = require('./connect')
const createWebhook = require('./createWebhook')
const createFields = require('./createFields')
const checkSub = require('./checkSub')
const router = express()

router.use(express.json())
router.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded', inflate: false,
    verify: (req, res, buf) => {
    req.rawBody = buf.toJSON()
        console.log('Buf: ' + buf)
}}))
router.use(express.static(path.join(__dirname, 'public')))


router.post('/createFields', createFields)
router.post('/createWebhook', createWebhook)
router.post('/', connectRouter)
router.post('/checkWebhook', bodyParser.json(), checkWebhook)
router.post('/checkSupPay', checkSub)

module.exports = router
