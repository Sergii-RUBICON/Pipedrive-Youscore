
//### Requires ###\\
const mongoose = require('mongoose')

//### Create mongo models ###\\
const Users = mongoose.model('Users', {
    portal: {type: String},
    username: {type: String},
    company_name: {type: String},
    icon_url: {type: String},
    access_token: {type: String},
    refresh_token: {type: String},
    api_key: {type: String},
    subscription_end: { type : Date, default: Date.now },
    subscription_status: {type: Boolean, default: false},
})

const fields = mongoose.model('fields', {
    Portal: {type: String},
    Code_EDRPO_Key: {type: String},
    Company_name_Key: {type: String},
    Name_director_Key: {type: String},
    Short_name_director_Key: {type: String},
    Ifo_for_contract_Key: {type: String}
})

const yKey = mongoose.model('yKey', {
    portal: {type: String},
    Y_api_key: {type: String}
})

//### Add new collections ###\\
async function updateUser (portal, username, company_name, icon_url, access_token, refresh_token, api_key) {
    const createdUser = new Users({
        portal: portal,
        username: username,
        company_name: company_name,
        icon_url: icon_url,
        access_token:  access_token,
        refresh_token: refresh_token,
        api_key:  api_key,
    })
    await createdUser.save()
    return createdUser
}

async function updateFields (Portal, Code_EDRPO_Key, Company_name_Key, Name_director_Key, Short_name_director_Key, Ifo_for_contract_Key) {
    const createdFieldsKeys = new fields({
        Portal: Portal,
        Code_EDRPO_Key: Code_EDRPO_Key,
        Company_name_Key: Company_name_Key,
        Name_director_Key:  Name_director_Key,
        Short_name_director_Key: Short_name_director_Key,
        Ifo_for_contract_Key: Ifo_for_contract_Key,
    })
    await createdFieldsKeys.save()
    return createdFieldsKeys
}

async function updateDBKey (portal, api_key) {
    const createdKey = new yKey({
        portal: portal,
        Y_api_key:  api_key,
    })
    await createdKey.save()
    return createdKey
}

//### Find collections ###\\
async function findUserByPortal (companyDomain) {
    const user = await Users.findOne({portal: companyDomain})
    return user
}

async function findUserByPortalAndUpdate (companyDomain, name, companyName, iconUrl, accessToken, refreshToken) {
    const filter = {portal: companyDomain}
    const update = {
        username: name,
        company_name: companyName,
        icon_url: iconUrl,
        access_token: accessToken,
        refresh_token: refreshToken
    }

    await Users.findOneAndUpdate(filter, update, {
        new: true
    })
}

async function findUserAndUpdateStatusSub (companyDomain, status) {
    const filter = {portal: companyDomain}
    const update = {
        subscription_status: status
    }

    await Users.findOneAndUpdate(filter, update, {
        new: true
    })
}

async function findOneAndUpdateStatusTime (companyDomain, date) {
    const filter = {portal: companyDomain}
    const update = {
        subscription_end: date
    }

    await Users.findOneAndUpdate(filter, update, {
        new: true
    })
}

async function findFieldsByPortal (companyDomain) {
    const fieldsKey = await fields.findOne({Portal: companyDomain})
    return fieldsKey
}

async function findYKeyByPortal (companyDomain) {
    const key = await yKey.findOne({portal: companyDomain})
    return key
}

async function findYKeyByPortalAndUpdate (portal, api_key) {
    const filter = {portal: portal}
    const update = {
        portal: portal,
        Y_api_key:  api_key,
    }

    await yKey.findOneAndUpdate(filter, update, {
        new: true
    })
}


//### Exports ###\\
module.exports = {
    updateUser,
    updateFields,
    updateDBKey,
    findUserByPortal,
    findUserByPortalAndUpdate,
    findFieldsByPortal,
    findYKeyByPortal,
    findYKeyByPortalAndUpdate,
    findUserAndUpdateStatusSub,
    findOneAndUpdateStatusTime,
}





