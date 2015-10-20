'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _libDatabase = require('../lib/Database');

var _libDatabase2 = _interopRequireDefault(_libDatabase);

var _libCursor = require('../lib/Cursor');

var _libCursor2 = _interopRequireDefault(_libCursor);

var _indexJs = require('../index.js');

describe('Collection', function () {
  var db = undefined;
  var collection = undefined;

  beforeEach(function callee$1$0() {
    return _regeneratorRuntime.async(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          db = new _libDatabase2['default']('pmongo_test', { emitError: true });
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

  describe('aggregate', function () {
    it('supports $group', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.aggregate([{ $group: { _id: '$type' } }]));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.deep.have.members([{ _id: 'water' }, { _id: 'fire' }]);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('aggregateCursor', function () {
    it('supports $group', function callee$2$0() {
      var cursor, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water' }, { name: 'Starmie', type: 'water' }, { name: 'Charmander', type: 'fire' }, { name: 'Lapras', type: 'water' }]));

          case 2:
            cursor = collection.aggregateCursor([{ $group: { _id: '$type' } }]);

            (0, _chai.expect)(cursor).to.be.an['instanceof'](_libCursor2['default']);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(cursor.toArray());

          case 6:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.deep.have.members([{ _id: 'water' }, { _id: 'fire' }]);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('count', function () {
    it('returns the number of items in the collection', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ number: 1 }, { number: 2 }, { number: 3 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.count());

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

  describe('createIndex', function () {
    it('adds an index to the system.indexes collection', function callee$2$0() {
      var count;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ number: 1 }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').count({ 'key.number': 1 }));

          case 4:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.equal(1);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('adds an index to the system.indexes collection with the specified full text options', function callee$2$0() {
      var index;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ name: 'text', tags: 'text' }, { default_language: 'english', weights: { name: 10, tags: 5 }, name: 'testFtIndex' }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').findOne({ 'name': 'testFtIndex' }));

          case 4:
            index = context$3$0.sent;

            (0, _chai.expect)(index.weights).to.deep.equal({ name: 10, tags: 5 });

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('distinct', function () {
    it('returns the distinct values', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ number: 1 }, { number: 1 }, { number: 2 }, { number: 3 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.distinct('number'));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.have.members([1, 2, 3]);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('drop', function () {
    it('drops the collection and returns true if it exists', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ number: 1 }, { number: 2 }, { number: 3 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.drop());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be['true'];
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(db.getCollectionNames());

          case 8:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.not.include.members(['docs']);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('returns false if the collection does not exist', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.collection('notexist').drop());

          case 2:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be['false'];

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('dropIndex', function () {
    it('removes the index the system.indexes collection', function callee$2$0() {
      var count;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ number: 1 }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').count({ 'key.number': 1 }));

          case 4:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.equal(1);
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.dropIndex('number_1'));

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').count({ 'key.number': 1 }));

          case 10:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.equal(0);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('dropIndexes', function () {
    it('removes the indexes from the system.indexes collection', function callee$2$0() {
      var count;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ number: 1 }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').count({ 'key.number': 1 }));

          case 4:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.equal(1);
            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.dropIndexes());

          case 8:
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').count({ 'key.number': 1 }));

          case 10:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.equal(0);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('ensureIndex', function () {
    it('adds an index to the system.indexes collection', function callee$2$0() {
      var count;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.ensureIndex({ number: 1 }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('system.indexes').count({ 'key.number': 1 }));

          case 4:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.equal(1);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('find', function () {
    it('returns all documents', function callee$2$0() {
      var docs, cursor, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            docs = [{ hello: 'world' }, { hello: 'kitty' }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert(docs));

          case 3:
            cursor = collection.find();

            (0, _chai.expect)(cursor).to.be.an['instanceof'](_libCursor2['default']);
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(cursor.toArray());

          case 7:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.deep.have.members(docs);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('returns only the fields specified in the projection', function callee$2$0() {
      var cursor, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert({ hello: 'world', another: 'value' }));

          case 2:
            cursor = collection.find({}, { another: 1 });

            (0, _chai.expect)(cursor).to.be.an['instanceof'](_libCursor2['default']);
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(cursor.next());

          case 6:
            result = context$3$0.sent;

            (0, _chai.expect)(result.hello).to.be.undefined;
            (0, _chai.expect)(result.another).to.equal('value');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is an ObjectId', function callee$2$0() {
      var id, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = new _indexJs.ObjectId();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }, { hello: 'kitty' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.find(id));

          case 5:
            results = context$3$0.sent;

            (0, _chai.expect)(results).to.have.length(1);
            (0, _chai.expect)(results[0].hello).to.equal('world');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is not an object', function callee$2$0() {
      var id, results;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = 1;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }, { hello: 'kitty' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.find(id));

          case 5:
            results = context$3$0.sent;

            (0, _chai.expect)(results).to.have.length(1);
            (0, _chai.expect)(results[0].hello).to.equal('world');

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('findAndModify', function () {
    it('modifies a document and return the old value', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ id: 1, hello: 'you' }, { id: 2, hello: 'other' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.findAndModify({
              query: { id: 1 },
              update: { $set: { hello: 'world' } }
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.value.id).to.equal(1);
            (0, _chai.expect)(result.value.hello).to.equal('you');
            (0, _chai.expect)(result.lastErrorObject.updatedExisting).to.be['true'];
            (0, _chai.expect)(result.lastErrorObject.n).to.equal(1);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('modifies a document and return the new value', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ id: 1, hello: 'you' }, { id: 2, hello: 'other' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.findAndModify({
              query: { id: 2 },
              'new': true,
              update: { $set: { hello: 'me' } }
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.value.id).to.equal(2);
            (0, _chai.expect)(result.value.hello).to.equal('me');
            (0, _chai.expect)(result.lastErrorObject.updatedExisting).to.be['true'];
            (0, _chai.expect)(result.lastErrorObject.n).to.equal(1);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('removes a document and return the old value', function callee$2$0() {
      var result, count;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ id: 1, hello: 'you' }, { id: 2, hello: 'other' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.findAndModify({
              query: { id: 1 },
              remove: true
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.value.id).to.equal(1);
            (0, _chai.expect)(result.value.hello).to.equal('you');
            (0, _chai.expect)(result.lastErrorObject.n).to.equal(1);

            // check for removal
            context$3$0.next = 10;
            return _regeneratorRuntime.awrap(collection.count({ id: 1 }));

          case 10:
            count = context$3$0.sent;

            (0, _chai.expect)(count).to.be.equal(0);

          case 12:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('inserts a document using upsert', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ id: 1, hello: 'you' }, { id: 2, hello: 'other' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.findAndModify({
              query: { id: 3 },
              update: { id: 3, hello: 'girl' },
              'new': true,
              upsert: true
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.value.id).to.equal(3);
            (0, _chai.expect)(result.value.hello).to.equal('girl');
            (0, _chai.expect)(result.lastErrorObject.updatedExisting).to.be['false'];
            (0, _chai.expect)(result.lastErrorObject.n).to.equal(1);
            (0, _chai.expect)(result.lastErrorObject.upserted.toString()).to.equal(result.value._id.toString());

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('does nothing for a non-existent document', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ id: 1, hello: 'you' }, { id: 2, hello: 'other' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.findAndModify({
              query: { id: 0 },
              update: { $set: { hello: 'boy' } }
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.lastErrorObject.n).to.equal(0);

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('findOne', function () {
    it('returns a single document', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ id: 1, hello: 'you' }, { id: 2, hello: 'other' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.findOne());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.id).to.equal(1);
            (0, _chai.expect)(result.hello).to.equal('you');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is an ObjectId', function callee$2$0() {
      var id, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = new _indexJs.ObjectId();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }, { hello: 'kitty' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.findOne(id));

          case 5:
            result = context$3$0.sent;

            (0, _chai.expect)(result.hello).to.equal('world');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is not an object', function callee$2$0() {
      var id, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = 1;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }, { hello: 'kitty' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.findOne(id));

          case 5:
            result = context$3$0.sent;

            (0, _chai.expect)(result.hello).to.equal('world');

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('getIndexes', function () {
    it('returns a list of indexes', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ number: 1 }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.getIndexes());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.length).to.equal(2); // include _id index

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('group', function () {
    it('runs reduce and finalize functions', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ n: 3, online: 1 }, { n: 2, online: 2 }, { n: 2, online: 1 }, { n: 4, online: 3 }, { n: 5, online: 3 }, { n: 6, online: 5 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.group({
              key: {},
              cond: { n: { $lt: 5 } },
              initial: { count: 0, online: 0 },
              reduce: function reduce(doc, out) {
                out.count += doc.n;
                out.online += doc.online;
              },
              finalize: function finalize(out) {
                out.avgOnline = out.online / out.count;
              }
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.length).to.equal(1);
            (0, _chai.expect)(result[0].count).to.equal(11);
            (0, _chai.expect)(result[0].online).to.equal(7);
            (0, _chai.expect)(result[0].avgOnline).to.equal(7 / 11);

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('insert', function () {
    it('stores a single document in the database', function callee$2$0() {
      var doc, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            doc = {
              hello: 'world'
            };
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert(doc));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.find());

          case 5:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.deep.have.members([doc]);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('stores a multiple documents in the database', function callee$2$0() {
      var docs, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            docs = [{ name: 'fred' }, { name: 'barney' }];
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert(docs));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.find());

          case 5:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.deep.have.members(docs);

          case 7:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('throws an exception for an index violation', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ email: 1 }, { unique: true }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.insert({ email: 'foo@test.co.uk' }));

          case 4:
            context$3$0.prev = 4;
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(collection.insert({ email: 'foo@test.co.uk' }));

          case 7:
            (0, _chai.expect)(false).to.be.ok;
            context$3$0.next = 14;
            break;

          case 10:
            context$3$0.prev = 10;
            context$3$0.t0 = context$3$0['catch'](4);

            (0, _chai.expect)(context$3$0.t0.code).to.equal(11000);
            (0, _chai.expect)(context$3$0.t0).to.be.an['instanceof'](Error);

          case 14:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[4, 10]]);
    });
  });

  describe('isCapped', function () {
    it('returns true for a capped collection', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createCollection('cappedCollection', { capped: true, size: 1024 }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('cappedCollection').isCapped());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be['true'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('returns false for a non-capped collection', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(db.createCollection('uncappedCollection', { capped: false }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(db.collection('uncappedCollection').isCapped());

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result).to.be['false'];

          case 6:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('mapReduce', function () {
    it('produces the expected results', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water', level: 10 }, { name: 'Starmie', type: 'water', level: 8 }, { name: 'Charmander', type: 'fire', level: 8 }, { name: 'Lapras', type: 'water', level: 12 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.mapReduce(function () {
              emit(this.type, this.level);
            }, function (key, values) {
              return Array.sum(values);
            }, {
              query: { type: 'water' },
              out: { inline: 1 }
            }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.results.length).to.equal(1);
            (0, _chai.expect)(result.results[0]._id).to.equal('water');
            (0, _chai.expect)(result.results[0].value).to.equal(30);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('reIndex', function () {
    it('succeeds', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert({ hello: 'world' }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.reIndex());

          case 4:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('remove', function () {
    it('removes only one document if justOne is set', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water', level: 10 }, { name: 'Starmie', type: 'water', level: 8 }, { name: 'Charmander', type: 'fire', level: 8 }, { name: 'Lapras', type: 'water', level: 12 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.remove({ type: 'water' }, true));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.n).to.equal(1);

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.find({ type: 'water' }));

          case 8:
            result = context$3$0.sent;

            (0, _chai.expect)(result.length).to.equal(2);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('removes all matching documents', function callee$2$0() {
      var result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ name: 'Squirtle', type: 'water', level: 10 }, { name: 'Starmie', type: 'water', level: 8 }, { name: 'Charmander', type: 'fire', level: 8 }, { name: 'Lapras', type: 'water', level: 12 }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.remove({ type: 'water' }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.n).to.equal(3);

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.find({ type: 'water' }));

          case 8:
            result = context$3$0.sent;

            (0, _chai.expect)(result.length).to.equal(0);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is an ObjectId', function callee$2$0() {
      var id;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = new _indexJs.ObjectId();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.remove(id));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(collection.findOne(id));

          case 7:
            context$3$0.t0 = context$3$0.sent;
            (0, _chai.expect)(context$3$0.t0).to.not.exist;

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is not an object', function callee$2$0() {
      var id;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = 1;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.remove(id));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(collection.findOne(id));

          case 7:
            context$3$0.t0 = context$3$0.sent;
            (0, _chai.expect)(context$3$0.t0).to.not.exist;

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('save', function () {
    it('adds a new document to the collection', function callee$2$0() {
      var doc, cmp;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.save({ name: 'barney' }));

          case 2:
            doc = context$3$0.sent;

            (0, _chai.expect)(doc._id).to.exist;

            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(collection.findOne({ _id: doc._id }));

          case 6:
            cmp = context$3$0.sent;

            (0, _chai.expect)(cmp).to.deep.equal(doc);

          case 8:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('updates an existing document in the collection', function callee$2$0() {
      var doc, cmp;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.save({ name: 'barney' }));

          case 2:
            doc = context$3$0.sent;

            (0, _chai.expect)(doc._id).to.exist;

            doc.name = 'fred';
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(collection.save(doc));

          case 7:
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(collection.find());

          case 9:
            cmp = context$3$0.sent;

            (0, _chai.expect)(cmp).to.deep.have.members([doc]);

          case 11:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });
  });

  describe('update', function () {
    it('sets a field to a different value', function callee$2$0() {
      var result, cmp;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert({ hello: 'world' }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.update({ hello: 'world' }, { $set: { hello: 'verden' } }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.n).to.equal(1);

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.findOne());

          case 8:
            cmp = context$3$0.sent;

            (0, _chai.expect)(cmp.hello).to.equal('verden');

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('updates multiple documents if multi is set', function callee$2$0() {
      var result, cmp;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.insert([{ hello: 'world1' }, { hello: 'world2' }]));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.update({}, { $set: { updated: true } }, { multi: true }));

          case 4:
            result = context$3$0.sent;

            (0, _chai.expect)(result.n).to.equal(2);

            context$3$0.next = 8;
            return _regeneratorRuntime.awrap(collection.find({ updated: true }));

          case 8:
            cmp = context$3$0.sent;

            (0, _chai.expect)(cmp.length).to.equal(2);

          case 10:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is an ObjectId', function callee$2$0() {
      var id, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = new _indexJs.ObjectId();
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.update(id, { $set: { hello: 'kitty' } }));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(collection.findOne(id));

          case 7:
            result = context$3$0.sent;

            (0, _chai.expect)(result.hello).to.equal('kitty');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('assumes the query is for _id if it is not an object', function callee$2$0() {
      var id, result;
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            id = 1;
            context$3$0.next = 3;
            return _regeneratorRuntime.awrap(collection.insert({ _id: id, hello: 'world' }));

          case 3:
            context$3$0.next = 5;
            return _regeneratorRuntime.awrap(collection.update(id, { $set: { hello: 'kitty' } }));

          case 5:
            context$3$0.next = 7;
            return _regeneratorRuntime.awrap(collection.findOne(id));

          case 7:
            result = context$3$0.sent;

            (0, _chai.expect)(result.hello).to.equal('kitty');

          case 9:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this);
    });

    it('throws an exception for an index violation', function callee$2$0() {
      return _regeneratorRuntime.async(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            context$3$0.next = 2;
            return _regeneratorRuntime.awrap(collection.createIndex({ email: 1 }, { unique: true }));

          case 2:
            context$3$0.next = 4;
            return _regeneratorRuntime.awrap(collection.insert({ email: 'foo@test.co.uk' }));

          case 4:
            context$3$0.next = 6;
            return _regeneratorRuntime.awrap(collection.insert({ email: 'bar@test.co.uk' }));

          case 6:
            context$3$0.prev = 6;
            context$3$0.next = 9;
            return _regeneratorRuntime.awrap(collection.update({ email: 'foo@test.co.uk' }, { email: 'bar@test.co.uk' }));

          case 9:
            (0, _chai.expect)(false).to.be.ok;
            context$3$0.next = 16;
            break;

          case 12:
            context$3$0.prev = 12;
            context$3$0.t0 = context$3$0['catch'](6);

            (0, _chai.expect)(context$3$0.t0.code).to.equal(11000);
            (0, _chai.expect)(context$3$0.t0).to.be.an['instanceof'](Error);

          case 16:
          case 'end':
            return context$3$0.stop();
        }
      }, null, this, [[6, 12]]);
    });
  });
});

// issue #24

// make sure the collection exists

// issue #24
