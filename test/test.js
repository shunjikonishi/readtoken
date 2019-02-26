const fs = require("fs");
const assert = require("chai").assert;
const ReadToken = require("../index");

describe("readtoken", function() {
  it("can read simple1.txt", function(done) {
    const is = fs.createReadStream("test/data/simple1.txt", {
      encoding: 'utf8'
    });
    const tokens = [];
    const readToken = new ReadToken(is);
    readToken.on("token", (token) => {
      tokens.push(token);
    });
    readToken.on("close", () => {
      assert.equal(tokens.length, 3);
      assert.equal(tokens[0], "abc");
      assert.equal(tokens[1], "def");
      assert.equal(tokens[2], "ghi");
      done();
    });
  });

  it("can read maxlength.txt", function(done) {
    const is = fs.createReadStream("test/data/maxlength.txt", {
      encoding: 'utf8'
    });
    const tokens = [];
    const readToken = new ReadToken(is, {
      maxLength: 5
    });
    readToken.on("token", (token) => {
      tokens.push(token);
    });
    readToken.on("close", () => {
      console.log(tokens);
      assert.equal(tokens.length, 6);
      assert.equal(tokens[0], "abcde");
      assert.equal(tokens[1], "fghij");
      assert.equal(tokens[2], "klmno");
      assert.equal(tokens[3], "pqrst");
      assert.equal(tokens[4], "uvwxy");
      assert.equal(tokens[5], "z");
      done();
    });
  });

  it("can read combine.txt", function(done) {
    const is = fs.createReadStream("test/data/combine.txt", {
      encoding: 'utf8'
    });
    const tokens = [];
    const readToken = new ReadToken(is, {
      maxLength: 5
    });
    readToken.on("token", (token) => {
      tokens.push(token);
    });
    readToken.on("close", () => {
      console.log(tokens);
      assert.equal(tokens.length, 16);
      assert.equal(tokens[0], "abcde");
      assert.equal(tokens[1], "fghij");
      assert.equal(tokens[2], "klmno");
      assert.equal(tokens[3], "pqrst");
      assert.equal(tokens[4], "uvwxy");
      assert.equal(tokens[5], "z");
      assert.equal(tokens[6], "123");
      assert.equal(tokens[7], "456");
      assert.equal(tokens[8], "ABCDE");
      assert.equal(tokens[9], "FGHIJ");
      assert.equal(tokens[10], "KLMNO");
      assert.equal(tokens[11], "PQRST");
      assert.equal(tokens[12], "UVWXY");
      assert.equal(tokens[13], "Z");
      assert.equal(tokens[14], "789");
      assert.equal(tokens[15], "0");
      done();
    });
  });

  it("can read japanese.txt", function(done) {
    const is = fs.createReadStream("test/data/japanese.txt", {
      encoding: 'utf8'
    });
    const tokens = [];
    const readToken = new ReadToken(is);
    readToken.on("token", (token) => {
      tokens.push(token);
    });
    readToken.on("close", () => {
      console.log(tokens);
      assert.equal(tokens.length, 3);
      assert.equal(tokens[0], "東京");
      assert.equal(tokens[1], "国道1号");
      assert.equal(tokens[2], "横浜");
      done();
    });
  });

  it("can read japanese.txt with short readSize", function(done) {
    const is = fs.createReadStream("test/data/japanese.txt", {
      encoding: 'utf8'
    });
    const tokens = [];
    const readToken = new ReadToken(is, {
      maxLength: 5,
      readSize: 3
    });
    readToken.on("token", (token) => {
      tokens.push(token);
    });
    readToken.on("close", () => {
      console.log(tokens);
      assert.equal(tokens.length, 3);
      assert.equal(tokens[0], "東京");
      assert.equal(tokens[1], "国道1号");
      assert.equal(tokens[2], "横浜");
   done();
    });
  });

  it("can read combine.txt with short readSize", function(done) {
    const is = fs.createReadStream("test/data/combine.txt", {
      encoding: 'utf8'
    });
    const tokens = [];
    const readToken = new ReadToken(is, {
      maxLength: 5,
      readSize: 3
    });
    readToken.on("token", (token) => {
      tokens.push(token);
    });
    readToken.on("close", () => {
      console.log(tokens);
      assert.equal(tokens.length, 16);
      assert.equal(tokens[0], "abcde");
      assert.equal(tokens[1], "fghij");
      assert.equal(tokens[2], "klmno");
      assert.equal(tokens[3], "pqrst");
      assert.equal(tokens[4], "uvwxy");
      assert.equal(tokens[5], "z");
      assert.equal(tokens[6], "123");
      assert.equal(tokens[7], "456");
      assert.equal(tokens[8], "ABCDE");
      assert.equal(tokens[9], "FGHIJ");
      assert.equal(tokens[10], "KLMNO");
      assert.equal(tokens[11], "PQRST");
      assert.equal(tokens[12], "UVWXY");
      assert.equal(tokens[13], "Z");
      assert.equal(tokens[14], "789");
      assert.equal(tokens[15], "0");
   done();
    });
  });
});