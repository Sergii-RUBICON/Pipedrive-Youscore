const fields = require('../fields')

//### Load result after create fields ###\\
async function createFields(req, res) {
    if (req.user.length < 1) {
        return res.redirect('/auth/pipedrive')
    }
    try {
        await fields.addNewCustomOrganizationField(req.user.access_token)
        res.render('main', {
            createFields: 'Створено'
        })
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = createFields