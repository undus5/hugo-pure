#!/usr/bin/env bash

_sdir=$(dirname $(readlink -f ${BASH_SOURCE[0]}))
cd ${_sdir}/images

# check if files exist
if [[ ! -f light.png ]]; then
    ls light.png
    exit 1
fi
if [[ ! -f dark.png ]]; then
    ls dark.png
    exit 1
fi

echo "Tip: Disable gnome accessibility large text to get right scale screenshots"

# convert screenshots to jpg to reduce size
convert light.png l.jpg
convert dark.png d.jpg
# screenshot resolution is 1920x1080
# captured from fullscreen mode chrome
# chrome scrollbar width is 15px
# remove scrollbar from screenshot (1904 = 1920 - 16)
convert l.jpg -crop 1904x1080+0+0 l.jpg
convert d.jpg -crop 1904x1080+0+0 d.jpg
# target resolution is 1500x1000 (15:10)
# 1620:1080 = 15:10 (fit height)
# crop half size from middle
# 810 = 1620 / 2
# 547 = (1904 - 810) / 2
# crop to 1620x1080
convert l.jpg -crop 810x1080+547+0 l.jpg
convert d.jpg -crop 810x1080+547+0 d.jpg
# merge two halves horizontally
convert l.jpg d.jpg +append screenshot.jpg
# scale to 1500x1000
convert screenshot.jpg -scale 1500x screenshot.jpg
# generate thumbnail (900x600)
convert screenshot.jpg -scale 900x tn.jpg
# clean images
rm light.png dark.png
rm l.jpg d.jpg
