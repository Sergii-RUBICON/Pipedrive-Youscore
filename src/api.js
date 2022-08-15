
//### Requires ###\\
const request = require('request-promise');
const axios = require('axios')
const user = require('./db/user')

//### Get info from Pipedrive ###\\
async function getUser(accessToken) {
    const requestOptions = {
        uri: 'https://api.pipedrive.com/v1/users/me',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        json: true
    };
    const userInfo = await request(requestOptions);

    return userInfo;
}

async function getFields(accessToken) {
    const requestOptions = {
        uri: `https://api.pipedrive.com/v1/organizationFields?limit=100`,
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        },
        json: true
    };
    return await request(requestOptions)
}

//### Get info from Youscore ###\\
function checkConnect(apiKey) {
    return new Promise((resolve, reject) => {
        axios.get('https://api.youscore.com.ua/v1/rateLimits?apiKey=' + apiKey).catch(reject).then(resolve)
    })
}

async function getTOV(code, companyDomain) {
    const apiKey = await user.findYKeyByPortal(companyDomain)
    const result = await axios.get(`https://api.youscore.com.ua/v1/companyInfo/${code}?apiKey=` + apiKey.Y_api_key)
    console.log(result.data)
    return result.data
}

async function getFOP(code, companyDomain) {
    const apiKey = await user.findYKeyByPortal(companyDomain)
    const result = await axios.get(`https://api.youscore.com.ua/v1/usr/${code}?apiKey=` + apiKey.Y_api_key, {showCurrentData: true})
    console.log(result)
    return result
}

//### Exports ###\\
module.exports = {
    getUser,
    checkConnect,
    getTOV,
    getFOP
};