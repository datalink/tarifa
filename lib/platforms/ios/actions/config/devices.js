var Q = require('q'),
    chalk = require('chalk'),
    format = require('util').format,
    tarifaFile = require('../../../../tarifa-file'),
    pathHelper = require('../../../../helper/path'),
    log = require('../../../../helper/log'),
    parseProvisionFile = require('../../lib/parse-mobileprovision');

function listDeviceInProvisioningWithInfo(config) {
    return tarifaFile.parse(pathHelper.root(), 'ios', config)
        .then(function (localSettings) {
            var localConf = localSettings.configurations.ios[config],
                label = localConf.sign;
            if(!label)
                return Q.reject(format('No `sign` attribute in configuration %s', config));

            var provisioning_path = localSettings.signing.ios[label].provisioning_path;

            return parseProvisionFile(provisioning_path).then(function (provision) {
                var devices = provision.uuids.map(function (uuid){
                    return { name: '', uuid: uuid, enabled: true };
                });
                return {
                    type: provision.type,
                    name: provision.name,
                    devices: devices
                };
            });
        });
}

function printDevices(title, msg) {
    return function (devices) {
        if(title) log.send('msg', chalk.cyan(title));
        if (devices.length) {
            if(msg) log.send('msg', msg);
            devices.forEach(function (device) {
                log.send(
                    'msg',
                    '%s %s enabled: %s',
                    chalk.cyan(device.name),
                    chalk.yellow(device.uuid),
                    device.enabled ? chalk.green(device.enabled) : 'false'
                );
            });
        }
    };
}

function list(config) {
    var cwd = process.cwd();
    return listDeviceInProvisioningWithInfo(config).then(function (provision) {
        var title = format('Provisioning Profile %s with Type: %s', provision.name, provision.type),
            msg = format('\nDevices in configuration: %s', config);
        printDevices(title, msg)(provision.devices);
    }).then(function (val) {
        process.chdir(cwd);
        return val;
    }, function (err) {
        process.chdir(cwd);
        throw err;
    });
}

module.exports = {
    list: list
};
