node-zmq-talk
=============

Node + ØMQ

## whoami

* Jim R. Wilson (jimbojw)
* [hexlib@](https://twitter.com/hexlib)

## Why ZeroMQ?

* Distributed systems
* Low latency
* Patterns!

Competition is home grown socket-based connectors.

Like SQL databases competed against home grown file based storage.

## Installing

Mac OSX

```sh
brew install zmq
```

Ubuntu

```sh
sudo apt-get install libtool autoconf automake uuid-dev build-essential
wget http://download.zeromq.org/zeromq-3.2.2.tar.gz
tar zxvf zeromq-3.2.2.tar.gz && cd zeromq-3.2.2
./configure
make
sudo make install
```

Testing

```sh
man zmq
```

Install zmq node module

```sh
npm install zmq
```

Testing

```sh
node --harmony -p -e 'require("zmq")'
```

First pass at troubleshooting (update system library cache):

```sh
sudo ldconfig
```

## Patterns

* PUB/SUB
* REQ/REP
* DEALER/ROUTER
* PUSH/PULL

## Simple PUB/SUB with sockets

Becaon application: fires an event once a second.

Nieve implementation using sockets.

PUB endpoint: [net-beacon-pub.js](net-beacon-pub.js)

SUB endpoint: [net-beacon-sub.js](net-beacon-sub.js)

## What's Wrong With That?

* Listener bias.
* Fault intolerant.
* Leaky buffers.
* Directionality (Publisher = Listener).

## PUB/SUB with ZMQ

Same beacon application.

PUB endpoint: [zmq-beacon-pub.js](zmq-beacon-pub.js)

SUB endpoint: [zmq-beacon-sub.js](zmq-beacon-sub.js)


