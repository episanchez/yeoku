var should = require('should');

var World = require('world');
var WorldConfiguration = require('worldConfiguration');
var WorldBuilder = require('worldBuilder');
var EntityManager = require('manager/entityManager');

var mockData = require('./mockData');

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

describe('WorldTest', function() {
  var mWorld = new World();
  mWorld.componentManager.create(mockData.WarriorComp);
  mWorld.componentManager.create(mockData.MageComp);
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
  });

  describe('#WorldConfiguration/Builder', function(){
    var wc = new WorldConfiguration();
    it('WorldConfiguration : Load From Arrays', function(done){
      wc.LoadConfFromArrays([mockData.WarriorComp, mockData.MageComp], [new mockData.BasicSystem(), new mockData.ExtendSystem()], []);
      var testWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
      should.exist(testWorld);
      should.exist(testWorld.getSystem('BasicSystem'));
      should.exist(testWorld.getSystem('ExtendSystem'));

      console.log("tes ; " + JSON.stringify(testWorld.getComponentManager().getComponentTypeByName('WarriorComp')));
      should.exist(testWorld.getComponentManager().getComponentTypeByName('WarriorComp'));
      testWorld.getComponentManager().getComponentTypeByName('WarriorComp').should.have.properties({'heresy': 0, 'combo' : 0});
      done();
    });
    it ('WorldConfiguration : Load From Configuration File', function(done){
      wc.clean();
      wc.LoadConfFromFile(__dirname + '/conf/worldConf.json');

      var testWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
      should.exist(testWorld);

      should.exist(testWorld.getSystem('BasicSystem'));
      should.exist(testWorld.getSystem('ExtendSystem'));

      // testWorld.getComponentManager().getComponentTypeByName('BasicComp').should.have.properties({'life': 0, 'mana' : 0});
      // testWorld.getComponentManager().getComponentTypeByName('ExtendComp').should.have.properties({'strength': 0, 'magic' : 0});
      done();
    });
  });

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

      console.log(entity);
      (entity.WarriorComp).should.have.properties({'heresy': 42, 'combo' : 42});
      done();
    });
/*    it ('intervalSystem process should be worked', function(done){
      mWorld.addSystem("ExtendSystem", new mockData.ExtendSystem());

      var entity = mWorld.em.getEntityById(0);
      entity.addComponent('MageComp');
      var entity = mWorld.em.getEntityById(0);
      (entity.ExtendComp).should.have.property('magic', '10');
      done();
    });*/
  });

});