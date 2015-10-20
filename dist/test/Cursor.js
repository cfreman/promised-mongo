'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _libDatabase = require('../lib/Database');

var _libDatabase2 = _interopRequireDefault(_libDatabase);

var _libCursor = require('../lib/Cursor');

var _libCursor2 = _interopRequireDefault(_libCursor);

describe('Cursor', function () {
  var db = undefined,
      collection = undefined;

  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          db = new _libDatabase2['default']('pmongo_test');
          context$2$0.next = 3;
          return _regeneratorRuntime.awrap(db.dropDatabase());

        case 3:
          collection = db.collection('docs');

        case 4:
        case 'end':
          return context$2$0.stop();
      }
    }, null, this);
  });

  describe('count', function () {
    it('returns the correct total count', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().count());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.equal(4);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('returns the correct filtered count', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find({ type: 'water' }).count());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.equal(3);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('explain', function () {
    it('returns the expected values', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().explain());

          case 4:
            result = context$3$0.sent;

            if (result.executionStats) {
              (0, _chai.expect)(result.executionStats.totalDocsExamined).to.equal(4);
            } else {
              (0, _chai.expect)(result.nscannedObjects).to.equal(4);
            }

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('forEach', function () {
    it('executes the function for each value', function callee$2$0() {
      var docs, touched;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            docs = [{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }];
            touched = [];
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.insert(docs));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(collection.find().forEach(function (doc) {
              delete doc._id; // so compare works
              touched.push(doc);
            }));

          case 6:

            (0, _chai.expect)(touched).to.deep.have.members(touched);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('limit', function () {
    it('limits the number of results', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().limit(2));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.length).to.equal(2);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('map', function () {
    it('maps each value', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ hello: 'barney' }, { hello: 'fred' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().map(function (x) {
              return x.hello;
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.have.members(['fred', 'barney']);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('next', function () {
    it('returns the next value', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ hello: 'barney' }, { hello: 'fred' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().next());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.hello).to.equal('barney');

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('rewind', function () {
    it('resets the cursor position', function callee$2$0() {
      var cursor, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            cursor = collection.find().sort({ name: 1 });
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(cursor.next());

          case 5:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Charmander');
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(cursor.next());

          case 9:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Lapras');
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(cursor.next());

          case 13:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Squirtle');
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(cursor.rewind());

          case 17:
            context$3$0.next = 19;
            return _regeneratorRuntime.awrap(cursor.next());

          case 19:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Charmander');

          case 21:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('size', function () {
    it('returns the number of results', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().limit(2).size());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.equal(2);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('skip', function () {
    it('skips the specified number of results', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().skip(2));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.length).to.equal(2);
            (0, _chai.expect)(result[0].name).to.equal('Charmander');
            (0, _chai.expect)(result[1].name).to.equal('Lapras');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('sort', function () {
    it('returns results in the requested order', function callee$2$0() {
      var cursor, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            cursor = collection.find().sort({ name: 1 });
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(cursor.next());

          case 5:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Charmander');
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(cursor.next());

          case 9:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Lapras');
            context$3$0.next = 13;
            return _regeneratorRuntime.awrap(cursor.next());

          case 13:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Squirtle');
            context$3$0.next = 17;
            return _regeneratorRuntime.awrap(cursor.next());

          case 17:
            result = context$3$0.sent;

            (0, _chai.expect)(result.name).to.equal('Starmie');

          case 19:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('toArray', function () {
    it('returns results in an array', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.find().toArray());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be.an['instanceof'](Array);
            (0, _chai.expect)(result.length).to.equal(4);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('should be able to handle lots of documents', function callee$2$0() {
      var numDocs, added, docsToInsert, i, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            this.timeout(10000);

            numDocs = 10000;
            added = 0;

          case 3:
            if (!(added < numDocs)) {
              context$3$0.next = 10;
              break;
            }

            docsToInsert = [];

            for (i = 0; i < 1000 && added < numDocs; i++) {
              docsToInsert[i] = { i: i, name: 'Pokemon ID #' + added };
              added++;
            }
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.insert(docsToInsert));

          case 8:
            context$3$0.next = 3;
            break;

          case 10:
            context$3$0.next = 12;
            return _regeneratorRuntime.awrap(collection.find().toArray());

          case 12:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be.an['instanceof'](Array);
            (0, _chai.expect)(result.length).to.equal(numDocs);

          case 15:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });
});
// max batch write size is 1000
