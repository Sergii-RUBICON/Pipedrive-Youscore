const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const checkWebhook = require('./checkWebhook')
const connectRouter = require('./connect')
const createWebhook = require('./createWebhook')
const createFields = require('./createFields')
const checkSub = require('./checkSub')
const router = express()


const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })
//router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static(path.join(__dirname, 'public')))
//router.use(bodyParser.urlencoded({ extended: false}))

router.post('/createFields', createFields)
router.post('/createWebhook', createWebhook)
router.post('/', connectRouter)
router.post('/checkWebhook', bodyParser.json(), checkWebhook)
router.post('/checkSupPay', urlencodedParser, jsonParser, checkSub)

module.exports = router

