# AI-VS-COVID19 Search UI 

## About

This is a UI for [BigMedBioBERT2 project][BERT2] dataset Elasticsearch index.

## Development

### Local

```
yarn install
yarn start
```

## Deployment

Make  sure you have a google cloud account and a google cloud project setup
```
gcloud auth login
```
```
gcloud config get-value project
```
if you don't have any project configured, then set one
```
gcloud config set project  my-google-cloud-project
```

The **first time** you deploy you need to setup a google bucket and configure
the default webpage (index.html)
```
export GCS_BUCKET=search-$PROJECT_ID
gsutil mb -b on gs://$GCS_BUCKET
gsutil web set -m index.html gs://$GCS_BUCKET
gsutil iam ch allUsers:objectViewer gs://$GCS_BUCKET
```
  - name: gcr.io/cloud-builders/gsutil
    args: ["iam", "ch", "allUsers:objectViewer", "gs://${_GCS_BUCKET}"]

then add this bucket name to a local `.env` file:
```
echo GCS_BUCKET=$GCS_BUCKET >> .env
```
To make sure everything works:
```
gcloud builds submit . --substitutions=${_GCS_BUCKET}=$GCS_BUCKET
```
you only need the above steps the **first time**. 

After the initial setup you can just do:
```
yarn deploy
```
the website will be hosted at:
```
open https://storage.googleapis.com/${GCS_PROJECT}/index.html
```

```
yarn build
gsutil -m rsync -R ./build gs://$GCS_BUCKET
gsutil setmeta -R -h "Cache-Control: max-age=31536000" gs://$GCS_BUCKET/static/
```

# References
- [cloudbuild yarn images](https://github.com/GoogleCloudPlatform/cloud-builders/blob/master/yarn/cloudbuild.yaml)
