
//### Requires ###\\
const mongoose = require('mongoose')

//### Connect to DB ###\\
async function main() {
    await mongoose.connect('mongodb+srv://Serhii:user@cluster0.mpx16wy.mongodb.net/?retryWrites=true&w=majority');
}

main().catch(err => console.log(err))

//### Exports ###\\
module.exports = {main}
