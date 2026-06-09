#!/usr/bin/env bash

errf() { printf "${@}\n" >&2; exit 1; }
test_cmd() { command -v $1 &>/dev/null; }

test_cmd magick || errf "command not found: magick"

image_file=$(realpath $1)

[[ -f $image_file ]] || errf "file not found: ${image_file}"

filename=$(basename $image_file)
basename=${filename%.*}
ext=${filename##*.}
output_ext="webp"
output_width=960

if [[ -n $2 ]]; then
    output_name="${2%.*}.${output_ext}"
else
    # output_name="${basename}.${output_ext}"
    output_name="poster.${output_ext}"
fi

# image_file_width=$(identify -format "%w" "$image_file")
# if ((image_file_width > output_width)); then
#     magick $image_file -scale ${output_width}x "$output_name"
# else
#     magick $image_file "$output_name"
# fi
magick $image_file -scale ${output_width}x "$output_name"

