var path = require('path'),
    root = __dirname,
    questions = [
        'deploy/adhoc_apple_developer_identity',
        'deploy/store_apple_developer_identity',
    ];

module.exports = questions.map(function (question) {
    return path.resolve(root, question);
});
