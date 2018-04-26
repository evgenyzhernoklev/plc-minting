FROM ubuntu:16.04

ENV PATH "/usr/src/app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

RUN apt update && apt install -y ruby-full curl sudo locales-all
RUN gem install slim

# install nodejs
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
RUN apt install -y nodejs
RUN apt install -y build-essential

WORKDIR /usr/src/app
