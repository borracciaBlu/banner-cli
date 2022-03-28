'use strict';
var mocha = require('mocha');
var describe = mocha.describe;
var it = mocha.it;
var assert = require('assert');
var temporaryFile = '.temp1';
var fs = require('fs');

var loggerStub = ({
    debug: function(args, options) {
        //
    },
    completeBanner: function() {
        //
    },
    addBanner: function(bannerText) {
        //
    },
    addPath: function(path) {
        //
    },
    addFile: function(file) {
        //
    },
});

describe('lib banner', function tests() {
    var {
        getAuthorName,
        getOptions,
        getTemplate,
        getBanner,
        banner
    } = require('./lib/banner');

    describe('getAuthorName', function() {
        it('should handle null case', function () {
            assert.equal(getAuthorName(undefined), '');
            assert.equal(getAuthorName(1), '');
            assert.equal(getAuthorName(null), '');
            assert.equal(getAuthorName({}), '');
        });

        it('should handle string', function () {
            assert.equal(getAuthorName('Mr Dev'), 'Mr Dev');
            assert.equal(getAuthorName('Mr Dev <asdf@mail.com>'), 'Mr Dev');
        });

        it('should handle object', function () {
            assert.equal(getAuthorName({name: 'Mr Dev str'}), 'Mr Dev str');
        });
    });

    describe('getOptions', function() {
        it('should handle null case', function () {
            var options = getOptions();
            assert.equal(options.name, 'unknown');
            assert.equal(options.tag, '0.0.0');
            assert.equal(options.homepage, 'https://npm.com/unknown');
            assert.equal(options.license, 'This is free and unencumbered software released into the public domain.');
            assert.equal(options.author, '');
            assert.equal(options.year, new Date().getFullYear());
        });

        it('should handle default case', function () {
            var defaultOpt = {
                name: 'test',
                version: '0.0.1',
                homepage: 'homepage',
                license: 'MIT',
                author: 'Mr Dev',
            };
            var options = getOptions({}, defaultOpt);
            assert.equal(options.name, defaultOpt.name);
            assert.equal(options.tag, defaultOpt.version);
            assert.equal(options.homepage, defaultOpt.homepage);
            assert.equal(options.license, 'Licensed under the MIT license');
            assert.equal(options.author, defaultOpt.author);
        });

        it('should handle options case', function () {
            var cliOpt = {
                name: 'test1',
                tag: '0.0.2',
                homepage: 'homepage1',
                license: 'MIT1',
                author: 'Mr Dev1',
            };

            var defaultOpt = {
                name: 'test',
                version: '0.0.1',
                homepage: 'homepage',
                license: 'MIT',
                author: 'Mr Dev',
            };

            var options = getOptions(cliOpt, defaultOpt);
            assert.equal(options.name, cliOpt.name);
            assert.equal(options.tag, cliOpt.tag);
            assert.equal(options.homepage, cliOpt.homepage);
            assert.equal(options.license, 'Licensed under the MIT1 license');
            assert.equal(options.author, cliOpt.author);
        });
    });

    describe('getTemplate', function() {
        it('should handle null case', function () {
            var defaultTemplate = '/*!\n' +
                                    ' * [name] v[tag]\n' +
                                    ' * [homepage]\n' +
                                    ' *\n' +
                                    ' * Copyright (c) [year] [author]\n' +
                                    ' * [license]\n' +
                                    ' */\n';

            var template = getTemplate();
            assert.equal(template, defaultTemplate);

            var template2 = getTemplate({});
            assert.equal(template2, defaultTemplate);
        });

        it('should handle template case', function () {
            var template = getTemplate({ template: '/*! asd */'});
            assert.equal(template, '/*! asd */');
        });
    });

    describe('getBanner', function() {
        it('should handle null case', function () {
            var bannerText = getBanner('', {name: ''});
            assert.equal(bannerText, '');
        });

        it('should handle default case', function () {
            var expected = '/*!\n' +
                             ' * test v0.0.1\n' +
                             ' * homepage\n' +
                             ' *\n' +
                             ' * Copyright (c) 2022 Mr Dev\n' +
                             ' * MIT\n' +
                             ' */';

            var template = '/*!\n' +
                             ' * [name] v[tag]\n' +
                             ' * [homepage]\n' +
                             ' *\n' +
                             ' * Copyright (c) [year] [author]\n' +
                             ' * [license]\n' +
                             ' */';

            var options = {
                name: 'test',
                tag: '0.0.1',
                homepage: 'homepage',
                license: 'MIT',
                author: 'Mr Dev',
                year: '2022'
            };

            var banner = getBanner(template, options);
            assert.equal(banner, expected);
        });

        it('should handle template', function () {
            var expected = '/*!\n' +
                             ' * test v0.0.1\n' +
                             ' * homepage\n' +
                             ' *\n' +
                             ' * Copyright (c) 2022 Mr Dev\n' +
                             ' * MIT\n' +
                             ' */';

            var template = '/*!<br>' +
                             ' * [name] v[tag]<br>' +
                             ' * [homepage]<br>' +
                             ' *<br>' +
                             ' * Copyright (c) [year] [author]<br>' +
                             ' * [license]<br>' +
                             ' */';

            var options = {
                name: 'test',
                tag: '0.0.1',
                homepage: 'homepage',
                license: 'MIT',
                author: 'Mr Dev',
                year: '2022'
            };

            var bannerText = getBanner(template, options);
            assert.equal(bannerText, expected);
        });
    });

    describe('banner', function() {
        it('should handle null case', function () {
            assert.throws(banner, Error, 'File not found');
            assert.throws(() => banner([], {}, loggerStub), Error, 'File not found');
        });

        it('should add banner', async function() {
            fs.writeFileSync(temporaryFile, '');

            var args = [temporaryFile];
            var options = {
                name: 'test',
                tag: '0.0.1',
                homepage: 'homepage',
                license: 'MIT',
                author: 'Mr Dev',
                year: '2022',
                template: '/*! test [year] */',
            };

            banner(args, options, loggerStub);
            assert.equal(fs.readFileSync(temporaryFile, 'utf8'), '/*! test 2022 */');
            fs.unlinkSync(temporaryFile);
        });
    });
});
