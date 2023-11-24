#!/usr/bin/env bash

script_dir=$(dirname $(realpath $0))

cd ${script_dir}

rm -rf docs

hugo --minify \
    --baseURL "/hugo-pure/" \
    --destination docs \
    --buildDrafts
