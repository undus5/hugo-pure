#!/usr/bin/env bash

_sdir=$(dirname $(readlink -f ${BASH_SOURCE[0]}))

cd ${_sdir}

case $1 in
    build)
        shift
        hugo --minify \
            --environment demo \
            --buildDrafts \
            $@
        ;;
    run)
        hugo server \
            --environment demo \
            --buildDrafts \
            --baseURL http://localhost/ \
            --bind 0.0.0.0
        ;;
    *)
        echo "Usage $(basename $0) <build|run>"
        ;;
esac
