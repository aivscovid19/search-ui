.PHONY: build
build:
	yarn build

.PHONY: deploy
deploy:
	gcloud app deploy

all: deploy