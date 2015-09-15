var test = require('tape'),
    format = require('util').format,
    spawn = require('tape-spawn'),
    h = require('../helpers');

h.projectValues();

test('cli: tarifa create', function (t) {
    h.project(t);
});

test('cli: tarifa create, project folders created', function (t) {
    t.plan(1);
    var p = h.currentProjectVal().tmpPath;
    process.chdir(p);
    t.ok(h.isDirectory(p), 'project created');
});

h.platforms().filter(function (p) {
    return p !== 'firefoxos';
}).forEach(function (platform) {
    test(format('cli: tarifa platform add %s', platform), function (t) {
        var st = spawn(t, h.cmd(format('platform add %s', platform)));
        st.succeeds();
        st.end();
    });
});

test('cli: tarifa run all dev,default', function (t) {
    var st = spawn(t, h.cmd('run all dev,default'), {
        stdio: 'inherit'
    });
    st.succeeds();
    st.end();
});

test('cli: tarifa run -h', h.usageTest('run'));

h.cleanTest(process.cwd());
