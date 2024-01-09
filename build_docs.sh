#!/usr/bin/env bash

script_dir=$(dirname $(readlink -f ${BASH_SOURCE[0]}))

cd ${script_dir}

hugo --minify \
    --environment demo \
    --baseURL "/hugo-pure/" \
    --destination docs \
    --buildDrafts
