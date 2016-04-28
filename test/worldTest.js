var should = require('should');

var World = require('world');
//var WorldConfiguration = require('worldConfiguration');
var WorldBuilder = require('worldBuilder');
var EntityManager = require('manager/entityManager');

var mockData = require('./mockData');
/*
describe('World Features Testing', function() {
  var mWorld = new World();
  mWorld.componentManager.create(mockData.WarriorComp);
  mWorld.componentManager.create(mockData.MageComp);
  describe('#World', function() {
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
      should.exist(mWorld.removeSystem):
      should.exist(mWorld.addChangedId);
      should.exist(mWorld.addRemovedId);
      should.exist(mWorld.getChangedId);
      should.exist(mWorld.getRemovedId);
      should.exist(mWorld.updateEntityStates);
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

  // to be removed
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
  });

  describe('#WorldConfiguration & WorldBuilder Regression Test', function(){
    var wc = new WorldConfiguration();

    it('WorldConfiguration : existence features', function(done){
      should.exist(wc);
      should.exist(wc.LoadConfFromFile);
      should.exist(wc.getComponentsType);
      should.exist(wc.getSystems);
      should.exist(wc.getArchetypes);
      should.exist(wc.getOptManagers);
      done();
    });

    it('WorldBuilder : existence features', function(done){
      should.exist(WorldBuilder);
      should.exist(WorldBuilder.buildEmptyWorld);
      should.exist(WorldBuilder.BuildWithWorldConfiguration);
      done();
    });

    it ('WorldConfiguration : Load From Configuration File and create Entity with archetype', function(done){
      wc.clean();
      wc.LoadConfFromFile(__dirname + '/conf/worldConf.json');

      var testWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
      should.exist(testWorld);

      testWorld.archetypeManager.loadArchetypeFromFile(__dirname + '/conf/archetypeExample.json');
      var ae = testWorld.getArchetypeManager().getArchetypeByName('ArchetypeExample');
      should.exist(ae);
      testWorld.getEntityManager().createEntityWithArchetype(ae);
      var e1 = testWorld.getEntityManager().getEntityById(0);
      should.exist(e1);
      should.exist(e1["WarriorComp"]);
      should.exist(e1["MageComp"]);

      done();
    });
  });

  // to be removed
  describe('#ManageSystem', function(){

    it('add a system should be worked', function(done){
      mWorld.addSystem("BasicSystem", new mockData.BasicSystem());
      mWorld.addSystem("ExtendSystem", new mockData.ExtendSystem());
      var systems = mWorld.getSystems();

      should.exist(systems);
      should.exist(systems["BasicSystem"]);
      should.exist(systems["ExtendSystem"]);

      should.exist(systems["BasicSystem"].process);
      should.exist(systems["BasicSystem"].processSystem);
      should.exist(systems["BasicSystem"].initialize);
      should.exist(systems["BasicSystem"].processEntity);
      should.exist(systems["BasicSystem"].inserted);
      should.exist(systems["BasicSystem"].removed);
      should.exist(systems["BasicSystem"].insert);
      should.exist(systems["BasicSystem"].remove);

      should.exist(systems["ExtendSystem"].processEntity);
      done();
    });

    it('get a system should be worked', function(done){
      var bsys = mWorld.getSystem("BasicSystem", mockData.BasicSystem);
      var esys = mWorld.getSystem("ExtendSystem", mockData.ExtendSystem);

      should.exist(bsys);
      should.exist(esys);
      bsys.should.have.property('_name', 'BasicSystem');
      esys.should.have.property('_name', 'ExtendSystem');
      done();
    });

    it('remove a system should be worked', function(done){
      mWorld.removeSystem('ExtendSystem');

      should.exist(mWorld.getSystem('BasicSystem'));
      should.not.exist(mWorld.getSystem('ExtendSystem'));
      done();
    });

    it('process system should be worked', function(done){
      mWorld.process();
      mWorld.em.createEntity();
      var entity = mWorld.em.getEntityById(1);
      entity.addComponent('WarriorComp');
      mWorld.process();

      (entity.WarriorComp).should.have.properties({'heresy': 42, 'combo' : 42});
      done();
    });
  });

});
*/