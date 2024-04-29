# hugo-pure

English|[中文](https://github.com/undus5/hugo-pure/blob/main/README.zh.md)

A simple and clean [Hugo](https://gohugo.io) theme, [Live Demo](https://undus5.github.io/hugo-pure/)

## Features

- Responsive design (mobile device support)

- Dark mode support (auto switch)

- Multilingual support

- No Javascript

- Useful custom front matters

## Custom Front Matters

### List Page (_index.md)

```
+++
paginate      = 1      # number of posts per page
doubleColumns = true   # list style, also available in global hugo.toml
+++
```

### Single Page

```
+++
showToc     = true       # enable table of contents
showSummary = true       # show summary on list
type        = "hidden"   # hidden from any list (home, section, rss)

# add external source links beside tags

[[sources]]
title = "Source1"
url   = "https://gohugo.io/documentation/"

[[sources]]
title = "Source2"
url   = "https://gohugo.io/about/"
+++
```

## Usage

```
# Clone theme to your own project
$ git submodule add https://github.com/undus5/hugo-pure themes/hugo-pure

# Add theme to your project's config file
$ echo "theme = 'hugo-pure'" >> config.toml

# Or you can run demo directly
$ cd hugo-pure
$ ./rundemo.sh
```
