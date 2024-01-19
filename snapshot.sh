#!/usr/bin/env bash

script_dir=$(dirname $(readlink -f ${BASH_SOURCE[0]}))
cd ${script_dir}/images

# check if files exist
if [[ ! -f l.png ]]; then
    ls l.png
    exit 127
fi
if [[ ! -f r.png ]]; then
    ls r.png
    exit 127
fi

# convert screenshots to jpg to reduce size
convert l.png l.jpg && rm l.png
convert r.png r.jpg && rm r.png
# screenshot resolution is 1920x1080
# captured from fullscreen mode chrome
# chrome scrollbar width is 15px
# remove scrollbar from screenshot (1904 = 1920 - 16)
convert l.jpg -crop 1904x1080+0+0 l.jpg
convert r.jpg -crop 1904x1080+0+0 r.jpg
# target resolution is 1500x1000 (15:10)
# 1620:1080 = 15:10 (fit height)
# crop half size from middle
# 810 = 1620 / 2
# 547 = (1904 - 810) / 2
# crop to 1620x1080
convert l.jpg -crop 810x1080+547+0 l.jpg
convert r.jpg -crop 810x1080+547+0 r.jpg
# merge two halves horizontally
convert l.jpg r.jpg +append screenshot.jpg
# scale to 1500x1000
convert screenshot.jpg -scale 1500x screenshot.jpg
# generate thumbnail (900x600)
convert screenshot.jpg -scale 900x tn.jpg
# clean images
rm l.jpg r.jpg

