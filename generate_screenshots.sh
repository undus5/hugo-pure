#!/usr/bin/env bash

script_dir=$(dirname $(readlink -f ${BASH_SOURCE[0]}))
cd ${script_dir}/images

# generate screenshot (1500x1000)
# crop left half of 1920x1080
# 201=(1920-1500-18)/2 (18 is the width of scrollbar)
convert l.png -crop 750x1000+201+0 lc.jpg
# crop right half of 1920x1080
convert d.png -crop 750x1000+951+0 dc.jpg
# merge two halves horizontally
convert lc.jpg dc.jpg +append screenshot.jpg

# generate thumbnail (900x600)
convert screenshot.jpg -scale 900x tn.jpg

# clean images
rm l.png d.png lc.jpg dc.jpg
