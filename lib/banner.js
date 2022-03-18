const glob = require('glob');
const prependFile = require('prepend-file');
const pkg = require(`${process.cwd()}/package.json`);

/**
 * Get author name
 *
 * @see https://docs.npmjs.com/cli/v7/configuring-npm/package-json#people-fields-author-contributors
 *
 * @param string | {name: string, email: string, url:string} value
 * @return string
 */
function getAuthorName(value) {
    if (typeof value === 'string') {
        return value.split('<')[0].trim();
    }

    if (value instanceof Object && typeof value.name === 'string') {
        return value.name;
    }

    return '';
}

/**
 * Get options
 *
 * @param options        Object from comander option
 * @param defaultOptions Object from package.json
 * @return Object
 */
function getOptions(options = {}, defaultOptions = {}) {
    options.name = options.name || defaultOptions.name || 'unknown';
    options.tag = options.tag || defaultOptions.version || '0.0.0';
    options.homepage = options.homepage || defaultOptions.homepage || `https://npm.com/${options.name}`;
    options.license = options.license || defaultOptions.license;
    options.license = options.license ? `Licensed under the ${options.license} license` : 'This is free and unencumbered software released into the public domain.';
    options.author = options.author || getAuthorName(defaultOptions.author);
    options.year = options.year || new Date().getFullYear();

    return options;
}

/**
 * Get template
 *
 * @param options        Object from comander option
 * @return string
 */
function getTemplate(options = {}) {
    const defaultTemplate = '/*!\n' +
                            ' * [name] v[tag]\n' +
                            ' * [homepage]\n' +
                            ' *\n' +
                            ' * Copyright (c) [year] [author]\n' +
                            ' * [license]\n' +
                            ' */\n';

    return options.template || defaultTemplate;
}

/**
 * Get banner mergin template and options.
 *
 * @param string template
 * @param Object options  Object from comander option
 * @return string
 */
function getBanner(template, options) {
    return template
            .replace('[name]', options.name)
            .replace('[tag]', options.tag)
            .replace('[homepage]', options.homepage)
            .replace('[license]', options.license)
            .replace('[author]', options.author)
            .replace('[year]', options.year)
            .replace('[time]', Date.now())
            .split('<br>')
            .join('\n');
}


/**
 * Add banner to files
 *
 * @param Object args    Args from commander
 * @param Object options Sanitized options from getOptions
 * @return void
 */
function banner(args, options) {
    options = getOptions(options, pkg);

    let template = getTemplate(options);
    let bannerText = getBanner(template, options);

    if (!args || args.length === 0) {
        throw new Error('File not found');
    }

    args.forEach(function(path) {
        let files = glob.sync(path);

        files.map((file) => prependFile.sync(file, bannerText));
    });
}

module.exports.getAuthorName = getAuthorName;
module.exports.getBanner = getBanner;
module.exports.getOptions = getOptions;
module.exports.getTemplate = getTemplate;
module.exports.banner = banner;
