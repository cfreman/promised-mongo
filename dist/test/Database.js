'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _libDatabase = require('../lib/Database');

var _libDatabase2 = _interopRequireDefault(_libDatabase);

describe('Database', function () {
  var db = undefined;

  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          db = new _libDatabase2['default']('pmongo_test');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(db.dropDatabase());

        case 3:
          context$2$0.next = 5;
          return _regeneratorRuntime.awrap(db.runCommand('dropAllUsersFromDatabase'));

        case 5:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('addUser', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createUser({
              user: 'fred',
              pwd: 'password',
              roles: []
            }));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('collection', function () {
    it('returns a Collection object', function () {
      var result = db.collection('foo');
      (0, _chai.expect)(result).to.be.not['null'];
      (0, _chai.expect)(result.collectionName).to.equal('foo');
      (0, _chai.expect)(result.fullCollectionName).to.equal('pmongo_test.foo');
    });
  });

  describe('createCollection', function () {
    it('creates the collection', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createCollection('foo'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.getCollectionNames());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.include.members(['foo']);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('createUser', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createUser({
              user: 'fred',
              pwd: 'password',
              roles: []
            }));

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('dropDatabase', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.dropDatabase());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('dropUser', function () {
    'succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createUser({
              user: 'fred',
              pwd: 'password',
              roles: []
            }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.dropUser('fred'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    };
  });

  describe('getCollectionNames', function () {
    it('succeeds', function callee$2$0() {
      var collections;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createCollection('foo'));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.getCollectionNames());

          case 4:
            collections = context$3$0.sent;

            (0, _chai.expect)(collections).to.include.members(['foo']);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('getLastError', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.getLastError());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('getLastErrorObj', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.getLastErrorObj());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('removeUser', function () {
    it('succeed', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createUser({
              user: 'fred',
              pwd: 'password',
              roles: []
            }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.removeUser('fred'));

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('stats', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.stats());

          case 2:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('getSiblingDb', function () {
    it('succeeds', function callee$2$0() {
      var db2;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.getSiblingDb('test'));

          case 2:
            db2 = context$3$0.sent;

            (0, _chai.expect)(db2).to.exist;
            (0, _chai.expect)(db2._serverPromise).to.exist;
            (0, _chai.expect)(db2.config.dbName).to.equal('test');

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});

// this is required because the users are stored in the admin db
