const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const checkWebhook = require('./checkWebhook')
const connectRouter = require('./connect')
const createWebhook = require('./createWebhook')
const createFields = require('./createFields')
const checkSub = require('./checkSub')
const {application, json} = require("express");
const router = express()

//router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static(path.join(__dirname, 'public')))


router.post('/createFields', createFields)
router.post('/createWebhook', createWebhook)
router.post('/', connectRouter)
router.post('/checkWebhook', bodyParser.json(), checkWebhook)
router.post('/checkSupPay', bodyParser.urlencoded({ extended: false}), checkSub)

module.exports = router
