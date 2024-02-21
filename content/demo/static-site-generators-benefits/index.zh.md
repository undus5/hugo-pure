+++
title       = "静态网站生成框架的优点"
lastmod     = 2023-02-22T11:49:46+08:00
date        = 2023-02-20T11:49:46+08:00
tags        = ["DemoTag"]
showSummary = true
weight      = 100
[[sources]]
title = "来源"
url   = "https://gohugo.io/about/benefits/"
[[sources]]
title = "官方文档"
url   = "https://gohugo.io/documentation/"
+++

页面加载速度提升, 安全性提升, 和易用性提升只是静态网站生成框架诸多优点的其中一小部分.

The purpose of website generators is to render content into HTML files.
Most are “dynamic site generators.” That means the HTTP server—i.e.,
the program that sends files to the browser to be viewed—runs the generator to
create a new HTML file every time an end user requests a page.

<!--more-->

Over time, dynamic site generators were programmed to cache their HTML files to
prevent unnecessary delays in delivering pages to end users.
A cached page is a static version of a web page.

Hugo takes caching a step further and all HTML files are rendered on your computer.
You can review the files locally before copying them to the computer hosting the HTTP server.
Since the HTML files aren’t generated dynamically, we say that Hugo is a static site generator.

This has many benefits. The most noticeable is performance.
HTTP servers are very good at sending files—so good, in fact,
that you can effectively serve the same number of pages with a fraction of
the memory and CPU needed for a dynamic site.
