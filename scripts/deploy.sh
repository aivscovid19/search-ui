#!/bin/bash
export $(cat .env)
gcloud builds submit . --substitutions=_GCS_BUCKET=$GCS_BUCKET