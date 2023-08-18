<p align="center">
  <a href="https://github.com/borracciaBlu/banner-cli/" target="_blank">
    <img src="https://github.com/borracciaBlu/banner-cli/assets/2061731/fafb01f3-aec4-45d8-b316-73b9294c3aeb" width="114px" height="55px" alt="banner-cli" />
  </a>

  <br>
  <span align="center">
    CLI tool to add a comment banner to your files.
  </span>
</p>




<p dir="auto"  align="center">
    <a href="https://badge.fury.io/js/%40borracciablu%2Fbanner-cli"><img src="https://badge.fury.io/js/%40borracciablu%2Fbanner-cli.svg" alt="npm version"></a>
    <a href="https://coveralls.io/github/borracciaBlu/banner-cli?branch=main"><img src="https://coveralls.io/repos/github/borracciaBlu/banner-cli/badge.svg?branch=main" alt="Coverage Status"></a>
    <a href="https://github.com/borracciaBlu/banner-cli/actions?query=workflow%3Abuild-test"><img src="https://github.com/borracciaBlu/banner-cli/workflows/build-test/badge.svg" alt="Build Status"></a>
    <a href="https://github.com/borracciaBlu/banner-cli/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-BSD%203--Clause-blue.svg" alt="License"></a>
</p>


```

    /*! 
     * [name] v[tag]
     * [homepage]
     *
     * Copyright (c) [year] [author]
     * [license]
     */


```

By default it will use the values in `package.json`.  
All values are overridable.  

If you are evaluating the use of banners please read:
- [Versioning, banners and why you may consider using it](https://adropincalm.com/blog/versioning-and-banners/)

## Installing

`npm install @borracciablu/banner-cli`


## API Reference

```
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
  --dry-run                test the command, simulate without actually doing it
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

## Notes 
This package is highly inspired by [banner-cli](https://www.npmjs.com/package/banner-cli) and is currently a superset.
