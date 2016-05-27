var path = require('path'),
    dir = __dirname;

module.exports.commands = [
    {
        def: ['ios', 'devices', 'list', '*'],
        action: function (_) {
            return require(path.join(dir, 'devices')).list(_[3]);
        }
    },
    {
        def: ['provisioning', 'info', '*'],
        action: function (_) {
            return require(path.join(dir, 'provisioning')).info(_[2]);
        }
    }
];
