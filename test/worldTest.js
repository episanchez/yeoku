var should = require('should');

var World = require('world');
var WorldConfiguration = require('worldConfiguration');
var WorldBuilder = require('worldBuilder');
var EntityManager = require('manager/entityManager');

var mockData = require('./mockData');

describe('World Features Testing', function() {
  var mWorld = new World();
  describe('#World Regression Test', function() {
    it('World : existence features', function(done){
      should.exist(mWorld);
      should.exist(mWorld.getSystems);
      should.exist(mWorld.getSystem);
      should.exist(mWorld.getEntityManager);
      should.exist(mWorld.getAspectSubscriptionManager);
      should.exist(mWorld.getArchetypeManager);
      should.exist(mWorld.getComponentManager);
      should.exist(mWorld.process);
      should.exist(mWorld.addSystem);
      should.exist(mWorld.removeSystem);
      should.exist(mWorld.addChangedId);
      should.exist(mWorld.addRemovedId);
      should.exist(mWorld.getChangedIds);
      should.exist(mWorld.getRemovedIds);
      should.exist(mWorld.updateEntityStates);
      done();
    });
    it('World : existence attributes', function(done){
      mWorld.should.have.property('em');
      should.exist(mWorld.em);
      mWorld.em.should.be.an.Object;

      mWorld.should.have.property('aspectSubscriptionManager');
      should.exist(mWorld.aspectSubscriptionManager);
      mWorld.aspectSubscriptionManager.should.be.an.Object;

      mWorld.should.have.property('componentManager');
      should.exist(mWorld.componentManager);
      mWorld.componentManager.should.be.an.Object;

      mWorld.should.have.property('archetypeManager');
      should.exist(mWorld.archetypeManager);
      mWorld.archetypeManager.should.be.an.Object;

      done();
    });
  });

  describe('#WorldConfiguration & WorldBuilder Regression Test', function(){
    var wc = new WorldConfiguration();

    it('WorldConfiguration : existence features', function(done){
      should.exist(wc);
      should.exist(wc.LoadConfFromFile);
      should.exist(wc.getComponentsTypes);
      should.exist(wc.getSystems);
      should.exist(wc.getArchetypes);
      should.exist(wc.getOptManagers);
      done();
    });

    it('WorldBuilder : existence features', function(done){
      should.exist(WorldBuilder);
      should.exist(WorldBuilder.BuildEmptyWorld);
      should.exist(WorldBuilder.BuildWithWorldConfiguration);
      done();
    });

    it ('WorldConfiguration : Load From Configuration File', function(done){
      wc.clean();
      wc.LoadConfFromFile(__dirname + '/conf/worldConf.json');

      mWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
      should.exist(mWorld);
      done();
    });
  });

  describe('#World System processing', function(){
    it('The system should be removed', function(done){
      mWorld.removeSystem('ExtendSystem');

      should.exist(mWorld.getSystem('BasicSystem'));
      should.not.exist(mWorld.getSystem('ExtendSystem'));
      done();
    });
    it('Process Systems should be worked', function(done){
      mWorld.process();
      mWorld.em.createEntity();
      var entity = mWorld.em.getEntityById(0);
      entity.addComponent('WarriorComp');
      mWorld.process();

      (entity.WarriorComp).should.have.properties({'heresy': 42, 'combo' : 42});
      done();
    });
  });
});
