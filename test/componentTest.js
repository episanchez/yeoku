var should = require('should');

var Component = require('component/component');
var ComponentType = require('component/componentType');
var ComponentManager = require('manager/componentManager');
var Entity = require('entity');

var mockData = require('./mockData');

describe('Component Part Test', function() {
  describe('#Test Component without componentManager', function() {
    var bc = new mockData.BasicComp();
    var ec = new mockData.ExtendComp();
    it('BasicComp and ExtendComp exist', function(done) {
      should.exist(bc);
      should.exist(ec);
      done();
    });
    it('BasicComp and ExtendComp have good properties', function(done) {
      bc.should.have.properties({life : 0, mana : 0});
      ec.should.have.properties({strength : 0, magic : 0});
      done();
    });
    it('Could access to the BasicComp and ExtendComp functions', function(done) {
      should.not.exist(bc.getLife);
      (ec.getStrength()).should.be.equal(0);
      done();
    });
  });
  describe('#Test Component with componentManager', function() {
    var cm = new ComponentManager();
    var en = new Entity(null, 0);
    it('BasicComp and ExtendComp should be added in the manager', function(done) {
      cm.create('BasicComp', mockData.BasicComp);
      cm.create('ExtendComp', mockData.ExtendComp);

      var ct1 = cm.getComponentTypeByName('BasicComp');
      var ct2 = cm.getComponentTypeByName('ExtendComp');

      should.exist(ct1);
      should.exist(ct2);

      ct1.should.have.properties({_id :0, _name: 'BasicComp'});
      ct2.should.have.properties({_id :1, _name: 'ExtendComp'});

      var ct1Instance = new ct1._type;
      var ct2Instance = new ct2._type;

      ct1Instance.should.have.properties({life : 0, mana : 0});
      ct2Instance.should.have.properties({strength : 0, magic : 0});

      done();
    });
    it('BasicComp and ExtendComp should be added to the Entity', function(done) {
      cm.addComponentByName(en , 'BasicComp');
      cm.addComponentByName(en , 'ExtendComp');

      should.exist(en['BasicComp']);
      should.exist(en['ExtendComp']);

      (en['BasicComp']).should.have.properties({life : 0, mana : 0});
      (en['ExtendComp']).should.have.properties({strength : 0, magic : 0});
      done();
    });

    //Manage pool of entity components in ComponentManager
  });
});