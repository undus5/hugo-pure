# hugo-pure

[English](https://github.com/undus5/hugo-pure/),中文

一款简洁的 [Hugo](https://gohugo.io) 主题, [在线演示](https://hugo-pure.undus.net)

兼容性: 测试通过 hugo v0.147.3

## 特性

- 响应式设计 (适配移动设备)

- 暗色主题 (自动切换)

- 多语言支持

- 无 Javascript

- 禁止 AI 爬虫 (robots.txt)

- 实用的自定义选项 (front matters)

## 使用方法

```
# 克隆本主题到你自己的项目
$ git submodule add https://github.com/undus5/hugo-pure themes/hugo-pure

# 将主题加入你的项目配置文件
$ echo "theme = 'hugo-pure'" >> config.toml

# 或者你可以直接启动演示项目
$ cd hugo-pure
$ ./demo.sh run
```

## 自定义选项

### 列表页 (_index.md)

```
+++
paginate      = 1      # 每页文章数
doubleColumns = true   # 列表风格 (单列/双列), 也可在 hugo.toml 全局配置
+++
```

### 单页

```
+++
showToc     = true       # 开启章节索引
showSummary = true       # 在列表中显示摘要
hidden      = true       # 不在任何列表里显示 (home, section, rss)
subtitle    = "Foo Bar"  # 副标题 (由 @carmenbianca 贡献, 感谢)

# 添加来源外链, 与标签同列显示

[[sources]]
title = "Source1"
url   = "https://gohugo.io/documentation/"

[[sources]]
title = "Source2"
url   = "https://gohugo.io/about/"
+++
```

## 定制自己的更改

### Favicon

favicon 位置在 `assets/favicon.png`, 默认为空, 如果文件存在将会自动加载.

### 底部菜单

以下是底部菜单的额外配置项, 使用方法参照 `config/demo/hugo.toml`.

```
[[menus.footer.params]]
type        = "link" or "plain"
targetBlank = true
format      = "rss"
```

### CSS & JS

如果你想要覆盖自己的 CSS 或者 添加 JS 交互, 只需要在你的项目里创建带有指定
block name 的 partial template 即可, 举例说明:

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

或者 `layouts/partials/myassets.html`, `assets/mystyle.css`, `assets/myscript.js`

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

## 鸣谢

https://pure-css.github.io/

