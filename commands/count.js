const indexJs = require('../index.js');

module.exports = {
    slash: true,
    testOnly: true,
    description: 'Moderation count',
    callback: ({}) => {
        return `${indexJs.amountof}`
    },
}