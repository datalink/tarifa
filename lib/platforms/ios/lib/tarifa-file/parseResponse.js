module.exports = function (response, o) {

    if(response.deploy) {
        o.deploy = {};
    }

    if(response.adhoc_apple_developer_identity) {
        o.signing = o.signing || {};
        o.signing.ios = {
            adhoc: {
                identity: response.adhoc_apple_developer_identity || "FIXME",
                provisioning_path: "FIXME",
                provisioning_name: "FIXME"
            }
        };
        o.configurations.ios.stage.sign = 'adhoc';
    }

    if(response.store_apple_developer_identity) {

        o.signing = o.signing || {};
        o.signing.ios = o.signing.ios || {};
        o.signing.ios.store = {
            identity: response.store_apple_developer_identity || "FIXME",
            provisioning_path: "FIXME",
            provisioning_name: "FIXME"
        };
        o.configurations.ios.prod.sign = 'store';
    }

    if (response.hockeyapp) {
        if (response.platforms.indexOf('ios') !== -1) {
            o.configurations.ios.stage.hockeyapp_id = 'put here your hockeyapp app id';
        }
    }

    return o;
};
