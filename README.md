# hugo-pure

English|[中文](https://github.com/undus5/hugo-pure/blob/main/README.zh.md)

A simple and clean [Hugo](https://gohugo.io) theme, [Live Demo](https://hugo-pure.undus.net)

## Features

- Responsive design (mobile device support)

- Dark mode support (auto switch)

- Multilingual support

- No Javascript

- Disallow AI crawler (robots.txt)

- Useful custom front matters

## Usage

```
# Clone theme to your own project
$ git submodule add https://github.com/undus5/hugo-pure themes/hugo-pure

# Add theme to your project's config file
$ echo "theme = 'hugo-pure'" >> config.toml

# Or you can run demo directly
$ cd hugo-pure
$ ./demo.sh run
```

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
subtitle    = "Foo Bar"  # subtitle (contributed by @carmenbianca, thanks)

# add external source links beside tags

[[sources]]
title = "Source1"
url   = "https://gohugo.io/documentation/"

[[sources]]
title = "Source2"
url   = "https://gohugo.io/about/"
+++
```

## Customization

### Favicon

The favicon is empty by default, if needed, put one into `assets/favicon.png` in your own project,
it will be loaded automatically.

### CSS & JS

If you want to overwrite CSS or add JS, just create some partial templates
in your own project with specific block names, for examples:

`layouts/partials/mycss.html`

```
{{ define "css" }}
<style> ... </style>
{{ end }}
```

`layouts/partials/myjs.html`

```
{{ define "js" }}
<script> ... </script>
{{ end }}
```

Or `layouts/partials/myassets.html`, `assets/mystyle.css`, `assets/myscript.js`

```
{{ define "css" }}
    {{- $css := slice }}
    {{- $css = $css | append (resources.Get "mystyle.css") }}
    {{- $css = $css | resources.Concat "mystyle.bundle.css" }}
    {{- $css = $css | resources.Minify }}
    <link rel="stylesheet" href="{{- $css.RelPermalink -}}">
{{ end }}

{{ define "js" }}
    {{- $js := slice }}
    {{- $js = $js | append (resources.Get "myscript.css") }}
    {{- $js = $js | resources.Concat "myscript.bundle.css" }}
    {{- $js = $js | resources.Minify }}
    <script src="{{- $js.RelPermalink -}}"></script>
{{ end }}
```
