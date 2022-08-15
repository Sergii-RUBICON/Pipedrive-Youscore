const path = require('path')
const bodyParser = require('body-parser')
const express = require('express')
const checkWebhook = require('./checkWebhook')
const connectRouter = require('./connect')
const createWebhook = require('./createWebhook')
const createFields = require('./createFields')
const router = express()

router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.static(path.join(__dirname, 'public')))

//### Load main menu ###\\
router.get('/', async (req, res) => {
    try {
        res.render('main')
    }
    catch (error) {
        return res.send(error.message)
    }
})

router.post('/createFields', createFields)
router.post('/createWebhook', createWebhook)
router.post('/connect', connectRouter)
router.post('/checkWebhook', bodyParser.json(), checkWebhook)

module.exports = router