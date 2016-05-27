module.exports = {
    main: {
        // default apple developer identity for release build
        default_apple_developer_identity: 'iPhone Distribution'
    },
    external: {
        xcrun: {
            name: 'xcrun',
            description: 'generate ipa files',
            platform: 'ios',
            os_platforms: ['darwin'],
            print_version: 'xcrun --version'
        }
    }
};
