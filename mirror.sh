#!/usr/bin/env bash

tgt=$(dirname $(readlink -f ${BASH_SOURCE[0]}))
src=${1}

if [[ ! -f ${src}/theme.toml ]]; then
    echo "source dir is not theme project"
    exit 127
fi

if [[ ! -f ${tgt}/theme.toml ]]; then
    echo "target dir is not theme project"
    exit 127
fi

rsync -av --delete --exclude=.git* --exclude=docs ${src} ${tgt}
