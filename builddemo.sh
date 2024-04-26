#!/usr/bin/env bash

# script_dir=$(dirname $(readlink -f ${BASH_SOURCE[0]}))

# cd ${script_dir}

# rm -rf docs

hugo --minify \
    --environment demo \
    --buildDrafts
    # --baseURL "/hugo-pure/" \
    # --destination docs \
