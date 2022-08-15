
//### Requires ###\\
const mongoose = require('mongoose')

//### Create mongo models ###\\
const Users = mongoose.model('Users', {
    portal: {type: String},
    username: {type: String},
    access_token: {type: String},
    refresh_token: {type: String},
    api_key: {type: String}
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
async function updateUser (portal,username, access_token, refresh_token, api_key) {
    const createdUser = new Users({
        portal: portal,
        username: username,
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

async function findFieldsByPortal (companyDomain) {
    const fieldsKey = await fields.findOne({Portal: companyDomain})
    return fieldsKey
}

async function findYKeyByPortal (companyDomain) {
    const key = await yKey.findOne({portal: companyDomain})
    return key
}


//### Exports ###\\
module.exports = {
    updateUser,
    updateFields,
    updateDBKey,
    findUserByPortal,
    findFieldsByPortal,
    findYKeyByPortal
}



