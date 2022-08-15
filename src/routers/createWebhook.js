const fields = require('../fields')

//### Load result after create webhook ###\\
async function createWebhook(req, res) {
    if (req.user.length < 1) {
        return res.redirect('/auth/pipedrive')
    }
    try {
        await fields.addNewCustomWebhook()
        res.render('main', {
            webhook: 'Поля створенно'
        })
    } catch (error) {
        return res.redirect('/auth/pipedrive')
    }
}

module.exports = createWebhook