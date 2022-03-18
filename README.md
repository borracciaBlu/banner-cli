# banner-cli
[![npm version](https://badge.fury.io/js/%40borracciablu%2Fbanner-cli.svg)](https://badge.fury.io/js/%40borracciablu%2Fbanner-cli)
[![Coverage Status](https://coveralls.io/repos/github/borracciaBlu/banner-cli/badge.svg?branch=main)](https://coveralls.io/github/borracciaBlu/banner-cli?branch=main)
[![Build Status](https://github.com/borracciaBlu/banner-cli/workflows/build-test/badge.svg)](https://github.com/borracciaBlu/banner-cli/actions?query=workflow%3Abuild-test)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

CLI tool to add a banner comment to your files.

By default it will use the values in `package.json`. 
All values are overridable.

This package is highly inspired by [banner-cli](https://www.npmjs.com/package/banner-cli) and i would currently consider it as a superset.

```

    /*! 
     * [name] v[tag]
     * [homepage]
     *
     * Copyright (c) [year] [author]
     * [license]
     */


```

## Installing

`npm install @borracciablu/banner-cli`


## API Reference

```js
Usage: banner-cli [options] [source]

CLI tool to add a banner comment to your files.

Arguments:
  source                   Files to bannerize

Options:
  -V, --version            output the version number
  -n, --name <name>        override project name
  -t, --tag <tag>          override tag version
  -s, --site <site>        override homepage
  -a, --author <author>    override author
  -y, --year <year>        override year
  --template <template>    override template
  -l, --license <license>  override license
  -d, --debug              debug options and args
  -h, --help               display help for command
```

### Template feature

The `--template` option allows you to inject tags.  

**The avalable tags are:**

```
<br>      := new line. Like using \n. 
[name]    := project name
[tag]     := project tag version
[site]    := project homepage
[author]  := project author
[year]    := copyright year
[license] := license
[time]    := unix timestamp in seconds
```

### Examples
**Basic:**

```
# add banner to each js file
$ banner-cli 'dist/**/*.js'

# add banner to each css file
# override author, license, site
$ banner-cli 'dist/**/*.css' --author 'Mr Developer' --license MIT --site https://project.js.org

# use template 
$ banner-cli 'dist/**/*.css' --template '/*! v[tag] :: [time] */'
```

**Advanced:**

```
// in package.json 
// inject next tag 
{
    "scripts" : {
        "banner:patch": "NEXT_TAG=$(semver $npm_package_version -i patch) banner-cli 'dist/*.js' --template='/*! v[tag] :: [time] */' --tag=$NEXT_TAG"
    }
}

```