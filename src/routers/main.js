const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const checkWebhook = require('./checkWebhook')
const connectRouter = require('./connect')
const createWebhook = require('./createWebhook')
const createFields = require('./createFields')
const checkSub = require('./checkSub')
const router = express()

//router.use(express.urlencoded({ extended: true }))
router.use(express.static(path.join(__dirname, 'public')))

router.post('/createFields', express.urlencoded({ extended: true }), createFields)
router.post('/createWebhook', express.urlencoded({ extended: true }), createWebhook)
router.post('/', express.urlencoded({ extended: true }), connectRouter)
router.post('/checkWebhook', express.urlencoded({ extended: true }), bodyParser.json(), checkWebhook)
router.post('/checkSupPay', express.urlencoded({ extended: true,
    verify(req, res, buf,) {
    req.rawBody = buf.toString()
}}), checkSub)

module.exports = router
