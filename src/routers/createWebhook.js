const fields = require('../fields')

//### Load result after create webhook ###\\
async function createWebhook(req, res) {
    try {
        await fields.addNewCustomWebhook()
        res.render('main', {
            webhook: 'Поля створенно'
        })
    } catch (error) {
        console.log(error)
        return res.redirect('/auth/pipedrive')
    }
}

module.exports = createWebhook