---
hidden: true
---
# momesh.org

This repo houses the jekyll website backing [momesh.org](https://momesh.org). It is hosted on Github Pages. Source is available at https://github.com/momesh/momesh.github.io

## Dependencies

- Unix-y computer (MacOS, Linux - no idea if this works on windows)
- Ruby (2.7+)
- Ruby Bundler

## Making changes


```
$ make serve
...
Server address: http://127.0.0.1:4000
```

Any files edited will trigger a live reload in your browser.

Make a Pull Request with your changes

### Via CMS

You need a [Github](github.com) account to make changes to this website via CMS.

Admin interface: [/admin](/admin)

## Policies and OPA

There are OPA policies in `_policy/` to keep our configs tidy and valid. They run on each commit via Github Actions.
