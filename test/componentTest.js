var should = require('should');

var Component = require('../lib/component/component');
var ComponentType = require('../lib/component/componentType');

describe('ComponentFeatureTest', function() {
  describe('#ComponentClass', function() {
    var mcomp = new Component(null);
    it('Component is exist', function(done) {
      should.exist(mcomp);
      done();
    });
    it('Component has ctype', function(done) {
      mcomp.ctype = 'example';
      mcomp.should.have.property('ctype', 'example');
      done();
    })
  });
  describe('#ComponentTypeClass', function(){
  	var CTYPE = new ComponentType({_id: '1', _name: 'Color'});

  	it ('componentType is exist', function(done){
  		should.exist(CTYPE);
  		done();
  	});
  	it ('componentType has id and name', function(done){
  		CTYPE.should.have.properties({ctId: '1', ctname: 'Color'});
      done();
  	});
  });
});