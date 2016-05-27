var chalk = require('chalk'),
    format = require('util').format,
    log = require('../../../../helper/log'),
    tarifaFile = require('../../../../tarifa-file'),
    pathHelper = require('../../../../helper/path'),
    parseProvision = require('../../lib/parse-mobileprovision');

function info(config) {
    var root = pathHelper.root();
    config = config || 'default';
    return tarifaFile.parse(root, 'ios', config).then(function (localSettings) {
        if(!localSettings.configurations.ios[config].sign)
            return Q.reject(format('no signing settings in configuration %s', config));
        return {
            local: localSettings,
            label: localSettings.configurations.ios[config].sign
        };
    }).then(function (msg) {
        return parseProvision(msg.local.signing.ios[msg.label].provisioning_path);
    }).then(function (provision) {
        log.send('msg', '%s %s', chalk.underline('name:'), provision.name);
        log.send('msg', '%s %s', chalk.underline('chalk:'), provision.type);
        log.send('msg', '%s \n\t%s', chalk.underline('uuids:'), provision.uuids.join('\n\t'));
    });
}

module.exports = {
    info: info
};
