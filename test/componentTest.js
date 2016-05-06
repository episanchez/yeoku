var should = require('should');

var Entity = libRequire('entity/entity');
var ComponentManager = libRequire('manager/componentManager');

var mockData = require('./mockData');


// Have to do (new component system)
describe('Component Features Testing', function() {
  describe('#Component Regression Tests', function(){
    var componentBuilder = libRequire('component/componentBuilder');
    var genericObject = null;
    var firstInstance = null;
    var secondInstance = null;

    it('ComponentBuilder: existence features', function(done){
      should.exist(componentBuilder);
      should.exist(componentBuilder.createComponentFromJson);
      should.exist(componentBuilder.buildComponentFromFile);
      done();
    });
    it('ComponentBuilder generated object exists', function(done){
      genericObject = componentBuilder.buildComponentFromFile(__dirname + '/conf/componentExample.json');

      should.exist(genericObject);
      firstInstance = Object.create(genericObject);
      secondInstance = Object.create(genericObject);
      
      should.exist(firstInstance);
      should.exist(secondInstance);
      done();
    });
    it('ComponentBuilder generate new independant instances', function(done){
      firstInstance.attr1 = 89;
      firstInstance.should.have.property('attr1', 89);
      secondInstance.should.have.property('attr1', 20);
      done();
    });
  });

  describe('#ComponentManager Regression test', function(){
    var componentManager = new ComponentManager();
    var entity = new Entity(null, 0);
    it('ComponentManager : existence features', function(done){
      should.exist(componentManager);
      //maybe test the inheritance methods
      should.exist(componentManager.insert);
      should.exist(componentManager.remove);
      should.exist(componentManager.getComponentTypeByName);
      should.exist(componentManager.create);
      should.exist(componentManager.removeComponentType);
      should.exist(componentManager.addComponentByName);
      should.exist(componentManager.removeComponentByName);
      should.exist(componentManager.removeEntityComponentsSetByValue);
      should.exist(componentManager.removeAllComponentsByEntity);
      should.exist(componentManager.getAllComponentsByUID);
      done();
    });
    it('Add new components into componentManager', function(done){
      var WarriorComp = {name:'WarriorComp', attributes:{heresy:10, combo:0}};
      var MageComp = {name:'MageComp', attributes:{mana:10, flux:12}};

      var wcf = libRequire('component/componentBuilder').createComponentFromJson(WarriorComp);
      var mcf = libRequire('component/componentBuilder').createComponentFromJson(MageComp);
      should.exist(mcf);
      should.exist(wcf);
      componentManager.create(wcf);
      componentManager.create(mcf);

      should.exist(componentManager.getComponentTypeByName('WarriorComp'));
      should.exist(componentManager.getComponentTypeByName('MageComp'));
      done();
    });
    it('Add a component to an entity', function(done){
      componentManager.addComponentByName(entity, 'MageComp');
      should.exist(entity['MageComp']);
      (entity['MageComp']).should.have.properties({mana:10, flux:12});
      var lc = componentManager.getAllComponentsByUID(entity.uid);
      lc.length.should.be.equal(1);
      (lc[0]).should.be.equal(1);
      done();
    });
    it('Remove a component to an entity', function(done){
      componentManager.removeComponentByName(entity, 'MageComp');
      should.not.exist(entity['MageComp']);
      var lc = componentManager.getAllComponentsByUID(entity.uid);
      lc.length.should.be.equal(0);
      done();
    });
    it('Remove a component into componentManager', function(done){
      componentManager.removeComponentType('WarriorComp');
      should.not.exist(componentManager.getComponentTypeByName('WarriorComp'));
      should.exist(componentManager.getComponentTypeByName('MageComp'));
      done();
    });
  });
});