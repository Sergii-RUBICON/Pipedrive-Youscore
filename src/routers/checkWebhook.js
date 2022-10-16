const api = require('../api')
const User = require('../db/user')
const fields = require('../fields')

//### Checking webhook request ###\\
async function checkWebhook(req, res) {
    const subscription = await User.findUserByPortal(process.env.companyDomain)
    let subStatus

    const dateNow = Date.now()
    const dateSub = Date.parse(subscription.subscription_end)

    if (dateSub < dateNow) {
        subStatus = false
        const changeStatusSub = await User.findUserAndUpdateStatusSub (process.env.companyDomain, subStatus)
        res.end()
    }
    else {
        try {
            const dbFields = await User.findFieldsByPortal(process.env.companyDomain)
            const dbEDRPO = dbFields.Code_EDRPO_Key
            const dbCompanynName = dbFields.Company_name_Key
            const dbNameDirector = dbFields.Name_director_Key
            const dbShortNameDirector = dbFields.Short_name_director_Key
            const dbIfoForContract = dbFields.Ifo_for_contract_Key

            const previous = req.body.previous
            const previousEDRPO = previous[dbEDRPO]
            console.log(`ЄДРПОУ до зміни: ${previousEDRPO}`)

            const current = req.body.current
            const currentEDRPO = current[dbEDRPO]
            console.log(`ЄДРПОУ після зміни: ${currentEDRPO}`)

            if (currentEDRPO != previousEDRPO) {
                console.log('Зміна відбулася у полі ЄДРПОУ')
                let connectStatus
                let companyNameUse

                const orgID = current.id
                console.log(`Id організації з вебхука : ` + orgID)
                const orgName = current.name
                console.log(`Ім'я організація з вебхука : ` + orgName)
                if (String(currentEDRPO).length == 8) {
                    console.log('Запит на отримання інфорації по коду ТОВ')
                    try { //41750253
                        connectStatus = true
                        companyNameUse = true

                        const result = await api.getTOV(currentEDRPO, process.env.companyDomain)

                        console.log(`Результат до обробки: Назва компанії - ${result.name}, Ім'я директора - ${result.director}`)
                        const finishedFields = await fields.preparationFields(result.director, companyNameUse, result.name)

                        const update = await fields.updateFields(finishedFields.nameCompany, finishedFields.newFullName, finishedFields.newShortName, finishedFields.infoForContract, orgID, orgName, dbCompanynName, dbNameDirector, dbShortNameDirector, dbIfoForContract)
                        await fields.addNote(connectStatus, currentEDRPO, orgID)

                        console.log(`Значення полів для внесення: ${update}`)
                        res.end()
                    } catch (e) {
                        connectStatus = false
                        await fields.addNote(connectStatus, currentEDRPO, orgID)
                        console.log(`Виникла помилка при підключенні: ${e}`)
                        res.end()
                    }
                }
                else if (String(currentEDRPO).length == 10) {
                    console.log('Запит на отримання інформації по коду ФОП')
                    try { //3461610104
                        connectStatus = true
                        companyNameUse = false

                        const result = await api.getFOP(currentEDRPO, process.env.companyDomain)
                        console.log(`Результат до обробки: Ім'я директора - ${result.data.name}`)
                        const finishedFields = await fields.preparationFields(result.data.name, companyNameUse, result.name)

                        await fields.addNote(connectStatus, currentEDRPO, orgID)
                        await fields.updateFields(finishedFields.nameCompany, finishedFields.newFullName, finishedFields.newShortName, finishedFields.infoForContract, orgID, orgName, dbCompanynName, dbNameDirector, dbShortNameDirector, dbIfoForContract)
                        res.end()
                    } catch (e) {
                        connectStatus = false
                        await fields.addNote(connectStatus, currentEDRPO, orgID)
                        console.log(`Виникла помилка при підключенні: ${e}`)
                        res.end()
                    }
                }
                else {
                    console.log('Некоректна к-ть символів при змінні поля, має бути 8(ТОВ) або 10(ФОП)')
                    res.end()
                }
            }
            else {
                console.log('Зміна відбулася не в тому полі')
            }
            console.log(`К-ть повторень вебхука: ${req.body.retry}`)
            res.end()

        } catch (e) {
            console.log(`Виникла помилка при підключенні: ${e}`)
            res.end()
        }
    }
}

module.exports = checkWebhook