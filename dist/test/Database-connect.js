'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _libDatabase = require('../lib/Database');

var _libDatabase2 = _interopRequireDefault(_libDatabase);

describe('Database-connect', function () {
  describe('connect', function () {

    it('succeeds', function callee$2$0() {
      var db, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            db = new _libDatabase2['default']('pmongo_test');
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(db.connect());

          case 3:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be.not['null'];

          case 5:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('throws an error on invalid domain', function callee$2$0() {
      var db;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(5000);
            context$3$0.prev = 1;
            db = new _libDatabase2['default']('mongodb://invaliddomain/', {
              emitError: true,
              reconnect: false,
              reconnectInterval: null
            });
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(db.connect());

          case 5:
            throw new Error("shouldn't get here");

          case 8:
            context$3$0.prev = 8;
            context$3$0.t0 = context$3$0['catch'](1);

            (0, _chai.expect)(context$3$0.t0.message).to.contain('getaddrinfo ENOTFOUND');

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[1, 8]]);
    });

    it('throws an error on timeout', function callee$2$0() {
      var db;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.prev = 0;
            db = new _libDatabase2['default']('mongodb://10.255.255.1/pmongo_test', { emitError: true, reconnect: false, connectionTimeout: 1 });
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.connect());

          case 4:
            throw new Error("shouldn't get here");

          case 7:
            context$3$0.prev = 7;
            context$3$0.t0 = context$3$0['catch'](0);

            (0, _chai.expect)(context$3$0.t0.name).to.equal('MongoError');
            (0, _chai.expect)(context$3$0.t0.message).to.contain('timed out');

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[0, 7]]);
    });
  });
});
