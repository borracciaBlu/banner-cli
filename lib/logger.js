const log = require('npmlog');

function getLogger() {
    log.heading = 'banner-cli';

    let banner = '';
    let lastPath = '';
    let pathList = [];
    let fileList = [];

    function isSamePath(path) {
        return function(item) {
            return item.path === path;
        };
    }

    function logFile(file) {
        log.notice('', ' + ' + file.fileName);
    }

    return ({
        debug: function(args, options) {
            log.notice('');
            log.notice('','📦 Debug Info');
            log.notice('=== Arguments ===');
            log.notice('', args);
            log.notice('=== Options ===');
            log.notice('', options);
            log.notice('');
        },
        completeBanner: function() {
            log.notice('');
            log.notice('=== Banner Text ===');
            log.notice('', banner);
            log.notice('=== Files Found to Banner ===');

            pathList.forEach(function(path) {
                log.notice('', `For path: ${path}`);
                let files = fileList.filter(isSamePath(path));

                files.length === 0
                    ? log.notice('', ' + no items found')
                    : files.forEach(logFile);

                log.notice('');
            });

            log.notice('', `Total files bannerized: ${fileList.length}`);
        },
        addBanner: function(bannerText) {
            banner = bannerText;
        },
        addPath: function(path) {
            lastPath = path;
            pathList.push(path);
        },
        addFile: function(file) {
            fileList.push({path: lastPath, fileName: file});
        },
    });
}

module.exports.getLogger = getLogger;

