# hugo-pure

[English](https://github.com/undus5/hugo-pure/)|中文

一款简洁的 [Hugo](https://gohugo.io) 主题, [在线演示](https://undus5.github.io/hugo-pure/)

## 特性

- 响应式设计 (适配移动设备)

- 暗色主题 (自动切换)

- 多语言支持

- 无 Javascript

- 自定义选项 (front matter)

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
type        = "hidden"   # 不在任何列表里显示 (home, section, rss)

# 添加来源外链, 与标签同列显示

[[sources]]
title = "Source1"
url   = "https://gohugo.io/documentation/"

[[sources]]
title = "Source2"
url   = "https://gohugo.io/about/"
+++
```

## 使用

```
# 克隆本主题到你自己的项目
$ git submodule add https://github.com/undus5/hugo-pure themes/hugo-pure

# 将主题加入你的项目配置文件
$ echo "theme = 'hugo-pure'" >> config.toml

# 或者你可以直接启动演示项目
$ cd hugo-pure
$ ./rundemo.sh
```
