# plc-minting

to start project:
$ npm install
$ gulp

# Docker

$ docker build -t plc-minting .

$ docker run -it --rm --name plc-minting -v "$PWD":/usr/src/app plc-minting npm i

$ docker run -it --rm --name plc-minting -v "$PWD":/usr/src/app plc-minting gulp compile-css compile-html
