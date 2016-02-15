var should = require('should');

var World = require('../lib/world');
var EntityManager = require('../lib/manager/entityManager');

describe('WorldTest', function() {
  var mWorld = new World();
  describe('#initWorld', function() {
    it('mWorld should exist', function(done) {
      	should.exist(mWorld);
      	done();
    });
    it('entityManager should exist', function(done) {
      mWorld.should.have.property('em');
      should.exist(mWorld.em);
      mWorld.em.should.be.an.Object;
      done();
    });
    it('AspectSubscriptionManager should exist', function(done){
      mWorld.should.have.property('aspectSubscriptionManager');
      should.exist(mWorld.aspectSubscriptionManager);
      mWorld.em.should.be.an.Object;
      done();
    });
    it('ComponentManager should exist', function(done){
      mWorld.should.have.property('componentManager');
      should.exist(mWorld.componentManager);
      mWorld.em.should.be.an.Object;
      done();
    });
  });

  describe('#ManageEntities', function(){
    it('Create Entities : this one should exist', function(done){
      mWorld.em.createEntity();
      should.exist(mWorld.em.getEntityById(0));
      mWorld.em.getEntityById(0).should.be.an.Object;
      done();
    });
    it('Create Entities : should have uid equal to 1', function(done){
      mWorld.em.createEntity();
      var uid = mWorld.em.getEntityById(1).uid;
      uid.should.be.a.number;
      uid.should.be.equal(1);
      done();
    });

    // add and remove a system
  });

});