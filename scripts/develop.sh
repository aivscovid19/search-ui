docker build --rm -f Dockerfile -t search-ui:latest .

docker run --rm -it -v $PWD:/app -p 3000:3000 search-ui:latest  $@