'use strict';

require('source-map-support/register');
const Mocha = require('./dist/');
const {run, describe, before, it, beforeEach} = Mocha;
const assert = require('assert');

describe('suite foo', function () {
  let foo;

  before(() => {
    foo = 'bar';
  });

  it('should do a thing', function () {
    console.log(`foo: ${foo}`);
  });

  describe('suite 2', () => {
    let foo = 0;

    beforeEach(() => {
      foo++;
    });

    it('should do another thing', function () {
      console.log(`foo2: ${foo}`);
    });

    it('should do yet another thing', function () {
      console.log(`foo3: ${foo}`);
    });

    describe('suite 3', () => {
      it('foo bah', function () {
        console.log('foo4');
      });
    });
  });
});

run();
