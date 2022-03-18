#!/usr/bin/env node
'use strict';

const { program } = require('commander');
const pkg = require('./package.json');
const {banner} = require('./lib/banner');

program
    .name('banner-cli')
    .description(pkg.description)
    .version(pkg.version);

program
    .argument('[source]', 'Files to bannerize');

program
    .option('-n, --name <name>', 'override project name')
    .option('-t, --tag <tag>', 'override tag version')
    .option('-s, --site <site>', 'override homepage')
    .option('-a, --author <author>', 'override author')
    .option('-y, --year <year>', 'override year')
    .option('--template <template>', 'override template')
    .option('-l, --license <license>', 'override license')
    .option('-d, --debug', 'debug options and args');

program.addHelpText('after', `
Examples:
  $ banner-cli 'dist/**/*.js'
  $ banner-cli 'dist/**/*.css' --author 'Mr Developer' --license MIT --site https://project.js.org
  $ banner-cli 'dist/**/*.css' --template '/*<br> [name]<br> [tag]<br> [site]<br> [author]<br> [year]<br> [license]<br> [time] */'
`);

program.showSuggestionAfterError();

program.parse();

const args = program.args;
const options = program.opts();


if (options.debug) {
    console.log('Debug');
    console.log('\n');

    console.log('Args:');
    console.log(args);
    console.log('\n');

    console.log('Options:');
    console.log(options);

    process.exit(0);
}

if (args.length === 0) {
    program.help();
    process.exit(0);
}

banner(args, options);
process.exit(0);
