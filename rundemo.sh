#!/usr/bin/env bash

hugo server \
    --environment demo \
    --baseURL http://localhost/ \
    --bind 0.0.0.0 \
    --buildDrafts \
    --port 1315
