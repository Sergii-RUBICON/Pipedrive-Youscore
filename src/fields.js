
//### Requires ###\\
const db = require('./db/user')
const pipedrive = require('pipedrive')
const Api = require('./api.js')
const defaultClient = pipedrive.ApiClient.instance
const shevchenko = require('shevchenko')

//### Pipedrive api key ###\\
defaultClient.authentications.api_key.apiKey = process.env.PIPEDRIVE_API_KEY

//### Add new object after install ###\\
async function addNewCustomOrganizationField(accessToken) {
    console.log('Запит на створення полів')

    const fields = ([
        {
            name: 'Код ЄДРПОУ/РНОКПП',
            field_type: 'double'
        },
        {
            name: 'Назва компанії',
            field_type: 'varchar'
        },
        {
            name: 'П.І.Б. директора',
            field_type: 'varchar'
        },
        {
            name: 'П.І.Б. скорочено',
            field_type: 'varchar'
        },
        {
            name: 'Інфо для договору',
            field_type: 'varchar'
        }
    ])
    const arrayKeys = []

    const api = new pipedrive.OrganizationFieldsApi()
    const createdFields = await api.getOrganizationFields()

    let created = false
    for (const field of fields) {
        if (createdFields.data.some(createdField => createdField.name === field.name)) {
            created = true
            continue
        }
        const response = await api.addOrganizationField(field)
        console.log(`Поля створено успішно, результат створення: ${response}`)
        arrayKeys.push(response.data.key)
    }
    const userInfo = await Api.getUser(accessToken)
    console.log(userInfo.data.company_domain)
    if (!created) {
        await db.updateFields(
            userInfo.data.company_domain,
            arrayKeys[0],
            arrayKeys[1],
            arrayKeys[2],
            arrayKeys[3],
            arrayKeys[4],
        )
    }
}

async function addNewCustomWebhook() {
    console.log('Запит на створення вебхука')

    const webhook =
        {
            subscription_url: 'http://app.rubicon.tips:3000/checkWebhook',
            event_action: 'updated',
            event_object: 'organization'
        }
    let isWebhookCreated = false
    const api = new pipedrive.WebhooksApi()
    console.log(api)
    const response = await api.getWebhooks()
    const webhooks = response.data

    for (const i of webhooks) {
        if (i.subscription_url === webhook.subscription_url) {
            isWebhookCreated = true
        }
    }
    if (!isWebhookCreated) {
        try {
            const response = await api.addWebhook(webhook)
            console.log(`Вебхук додано успішно, результат: ${response}`)
        }
        catch (e) {
            console.log(`Виникла помилка при додавнні вебхука: ${e}`);
        }
    }
}

//### Preparation fields before update ###\\
async function preparationFields (director, companyNameUse, companyName) {
    console.log('Обробка імені: ' + director)

    let fullName = director.split(' ').map(n => n.charAt(0) + n.slice(1).toLowerCase()).join(' ')

    const newFullName = fullName
    console.log('П.І.Б Директора: ' + newFullName)

    let shortNme = fullName.split(' ')
    const newShortName = `${shortNme[0]} ${shortNme[1][0]}.${shortNme[2][0]}.`
    console.log('П.І.Б Скорочено: ' + newShortName)

    if (companyNameUse === true) {
        const nameCompany = companyName

        let changeName = fullName.split(' ')
        const getGender = await whatGender(changeName[1])
        console.log(getGender)
        const change = {
            gender: getGender,
            firstName: changeName[1],
            middleName: changeName[2],
            lastName: changeName[0]
        }
        const resultChange = shevchenko.inGenitive(change)
        const changedPIB = `${resultChange.lastName} ${resultChange.firstName} ${resultChange.middleName}`
        const infoForContract = `${companyName} в особі директора ${changedPIB}`
        console.log('Інфо для договору: ' + infoForContract)

        return {
            nameCompany: nameCompany,
            newFullName: newFullName,
            newShortName: newShortName,
            infoForContract: infoForContract
        }

    } else if (companyNameUse === false) {
        const nameCompany = `ФОП ${newFullName}`
        const infoForContract = `Фізична особа-підприємець ${newFullName}`
        console.log('Інфо для договору: ' + infoForContract)

        return {
            nameCompany: nameCompany,
            newFullName: newFullName,
            newShortName: newShortName,
            infoForContract: infoForContract
        }
    }
}

async function whatGender (firstName) {
    if (firstName.substr(-1) === 'а' | firstName.substr(-1) === 'я'
        &&  firstName !== 'Воля' | 'Гордята' |'Грива' | 'Микита' | 'Олекса' | 'Рава' | 'Слава' | 'Снага' | 'Сурма'
        | 'Хвала' | 'Ходота' | 'Чара') {
        console.log('Відміняємо в жіночому роді')
        return 'female'
    }
    else {
        console.log('Відміняємо в чоловічому роді')
        return 'male'
    }
}

//### Adding note to organization on Pipedrive ###\\
async function addNote (connectStatus, currentEDRPO, orgID, subStatus) {
    if (subStatus === false)  {
        const note =
            {
                org_id: orgID,
                content: `Статус підключення за кодом ${currentEDRPO}: Поповніть буь ласка ваш тарифний план`
            }
        const api = new pipedrive.NotesApi()
        await api.addNote(note)
        return
    }

    else if (connectStatus === false) {
        const note =
            {
                org_id: orgID,
                content: `Статус підключення за кодом ${currentEDRPO}: Невдала зміна полів`
            }
        const api = new pipedrive.NotesApi()
        await api.addNote(note)
        return
    }
    else if (connectStatus === true) {
        const note =
            {
                org_id: orgID,
                content: `Статус підключення за кодом ${currentEDRPO}: Успішно внесена зміна полів`
            }
        const api = new pipedrive.NotesApi()
        await api.addNote(note)
        return
    }
}

//### Update values on custom fields ###\\
async function updateFields (companyNameY, nameDirectorY, shortNameY, infoForContractY, id, name,
                             pipeCompanyName, pipeNameDirector, pipeShortName, pipeInfoForContract) {

    let opts = pipedrive.BasicOrganization.constructFromObject({
        name: name
    })

    opts[pipeCompanyName] = companyNameY
    opts[pipeNameDirector] = nameDirectorY
    opts[pipeShortName] = shortNameY
    opts[pipeInfoForContract] = infoForContractY

    console.log(opts)
    const api = new pipedrive.OrganizationsApi()
    await api.updateOrganization(id, opts)
}


async function timestampToNormalDate (date) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        timezone: 'UTC'
    }
    return new Date(date).toLocaleDateString("uk-UA", options)
}


async function checkSubStatus (date) {
    const dateNow = Date.now()
    const dateSub = Date.parse(date)

    if (dateNow > dateSub) {
        return "inactive"
    }
    else {
        return
    }
}

module.exports = {
    addNewCustomOrganizationField,
    addNewCustomWebhook,
    preparationFields,
    addNote,
    updateFields,
    timestampToNormalDate,
    checkSubStatus
}