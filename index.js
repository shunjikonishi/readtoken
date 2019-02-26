"use strict";

const EventEmitter = require("events");

class ReadToken {

  constructor(stream, options) {
    this.stream = stream;
    options = options || {};

    this.emitter = new EventEmitter();
    this.buf = "";
    this.sep = options.sep || " \t\r\n";
    this.maxLength = options.maxLength || 0;

    stream.on("readable", this.doRead.bind(this));
    stream.on("end", () => {
      this.emitter.emit("close");
    });
  }

  on(name, func) {
    this.emitter.on(name, func);
  }

  off(name, func) {
    this.emitter.off(name, func);
  }

  doRead() {
    var c = this.stream.read(1);
    while(c) {
      if (this.sep.indexOf(c) === -1) {
        this.buf += c;
        if (this.maxLength && this.buf.length >= this.maxLength) {
          this.doEmitToken();
        }
      } else if (this.buf.length > 0) {
        this.doEmitToken();
      }
      c = this.stream.read(1);
    }
    if (this.buf.length > 0) {
      this.doEmitToken();
    }
  }

  doEmitToken() {
    this.emitter.emit("token", this.buf);
    this.buf = "";
  }
}

module.exports = ReadToken;