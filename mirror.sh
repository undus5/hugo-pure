#!/usr/bin/env bash

basename() {
    # Usage: basename "path" ["suffix"]
    local tmp

    tmp=${1%"${1##*[!/]}"}
    tmp=${tmp##*/}
    tmp=${tmp%"${2/"$tmp"}"}

    printf '%s\n' "${tmp:-/}"
}

scriptname=$(basename ${BASH_SOURCE[0]})
tgt=$(dirname $(readlink -f ${BASH_SOURCE[0]}))

cd ${tgt}

src=$1
if [[ -z $1 ]]; then
    src=../undus/themes/hugo-pure/
fi

if [[ ! -f ${src}/theme.toml ]]; then
    echo "source dir is not theme project"
    exit 127
fi

if [[ ! -f ${tgt}/theme.toml ]]; then
    echo "target dir is not theme project"
    exit 127
fi

rsync -av --delete --exclude=.git* --exclude=docs --exclude=$scriptname ${src} ${tgt}
