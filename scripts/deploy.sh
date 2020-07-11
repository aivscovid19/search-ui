#!/bin/bash
export $(cat .env)

gcloud builds submit . --substitutions=_GCS_BUCKET=$GCS_BUCKET

gsutil setmeta \
        -h 'Cache-Control: max-age=180' \
        gs://${GCS_BUCKET}/index.html

 curl -vv -H 'Cache-Control: no-cache' http://34.107.215.75:80

export URL_MAP_NAME=website-prod
gcloud compute url-maps invalidate-cdn-cache $URL_MAP_NAME \
    --path "/index.html" \
    --host 34.107.215.75