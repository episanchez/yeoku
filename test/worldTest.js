var should = require('should');

var World = require('../lib/world');

describe('WorldTest', function() {
  describe('#initWorld', function() {
    var mWorld = new World();
    it('mWorld should exist', function(done) {
      should.exist(mWorld);
      done();
    });
  });
});