'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _chai = require('chai');

var _indexJs = require('../index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

describe('Main', function () {

  describe('Proxy', function () {
    it('defers unknown property accesses to the collection() function', function () {
      var called = false;
      var db = (0, _indexJs2['default'])('pmongo_test');

      // duck punch collection to assert that it is called
      db.collection = function (name) {
        called = name;
      };

      db.myCollection;
      (0, _chai.expect)(called).to.equal('myCollection');
    });
  });
});
