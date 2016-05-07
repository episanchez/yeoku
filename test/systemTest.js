var should = require('should');

var World = libRequire('world');

var BaseSystem = libRequire('system/baseSystem');
var EntitySystem = libRequire('system/entitySystem');
var IteratingSystem = libRequire('system/iteratingSystem');
var IntervalSystem = libRequire('system/intervalSystem');

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
	describe('#IntervalSystem', function(){
		var world = new World();
		it('checkProcessing return value should be equal to true', function(done){
			var intervalSystem = new IntervalSystem(15);

			world.addSystem('toto', intervalSystem);
			require('child_process').execSync("sleep 0.015");
			(intervalSystem.checkProcessing()).should.be.equal(true);
			require('child_process').execSync("sleep 0.015");
			(intervalSystem.checkProcessing()).should.be.equal(true);
			done();		
		});
	});
});