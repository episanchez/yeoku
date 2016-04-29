var should = require('should');

var BaseSystem = require('system/baseSystem');
var EntitySystem = require('system/entitySystem');
var IteratingSystem = require('system/iteratingSystem');
var IntervalSystem = require('system/intervalSystem');

describe('System Features Testing', function(){
	describe('#BaseSystem Regression Tests', function(){
		var baseSystem = new BaseSystem();
		it('BaseSystem : existence features', function(done){
			should.exist(baseSystem);
			should.exist(baseSystem.process);
			should.exist(baseSystem.begin);
			should.exist(baseSystem.initialize);
			should.exist(baseSystem.checkProcessing);
			should.exist(baseSystem.processSystem);
			should.exist(baseSystem.end);
			should.exist(baseSystem.enable);
			should.exist(baseSystem.disable);
			should.exist(baseSystem.setWorld);
			should.exist(baseSystem.getEnabled);
			should.exist(baseSystem.getWorld);
			done();
		});
	});
	describe('#EntitySystem Regression Tests', function(){
		var entitySystem = new EntitySystem();
		it('EntitySystem : existence features', function(done){
			should.exist(entitySystem);
			should.exist(entitySystem.initialize);
			should.exist(entitySystem.buildAspectWithComponentsTypeName);
			should.exist(entitySystem.remove);
			should.exist(entitySystem.insert);
			should.exist(entitySystem.removed);
			should.exist(entitySystem.inserted);
			done();
		});
	});
});