var should = require('should');

var Archetype = libRequire('entity/archetype');
var ArchetypeBuilder = libRequire('entity/archetypeBuilder');
var Entity = libRequire('entity/entity');
var World = libRequire('world');
var EntityManager = libRequire('manager/entityManager');

describe('Entity Features Testing', function(){
	var world = new World();
	var jsonArch = {
			name: 'ArchetypeExample',
			version: 0.2,
			components:{
				WarriorComp:{
					heresy:10,
					combo:0
				},
				MageComp:{
					mana:42,
					flux:15
				}
			}
		};
	var noDefaultValueArch = {
			name: 'noDefaultValue',
			version: 0.2,
			components:{
				WarriorComp:{},
				MageComp:{}
			}
		};
	describe('#Archetype & ArchetypeBuilder & ArchetypeManager Regression Tests', function(){
		var archetype = new Archetype();

	  	var WarriorComp = {name:'WarriorComp', attributes:{heresy:10, combo:0}};
      	var MageComp = {name:'MageComp', attributes:{mana:10, flux:12}};
      	var wcf = libRequire('component/componentBuilder').createComponentFromJson(WarriorComp);
      	var mcf = libRequire('component/componentBuilder').createComponentFromJson(MageComp);
      	
      	world.getComponentManager().create(mcf);
      	world.getComponentManager().create(wcf);
		it('Archetype : existence features', function(done){
			should.exist(archetype);
			should.exist(archetype.getComponents);
			should.exist(archetype.addComponent);
			should.exist(archetype.setComponents);
			done();
		});
		it('ArchetypeBuilder : existence features', function(done){
			should.exist(ArchetypeBuilder);
			should.exist(ArchetypeBuilder.buildArchetypeFromJson);
			done();
		});
		var archetypeManager = world.getArchetypeManager();
		it('ArchetypeManager: existence features', function(done){
			should.exist(archetypeManager);
			should.exist(archetypeManager.addArchetype);
			should.exist(archetypeManager.getArchetypes);
			should.exist(archetypeManager.getArchetypeByName);
			should.exist(archetypeManager.removeArchetype);
			done();
		});

		it('the archetype should be built from json object', function(done){
			var tmp = ArchetypeBuilder.buildArchetypeFromJson(jsonArch, world);
			should.exist(tmp);
			tmp.should.be.an.Object;
			tmp.should.be.an.instanceof(Archetype);
			done();
		});
		it('the archetype should be added to the manager', function(done){
			world.getArchetypeManager().addArchetype(jsonArch);
			var arch = archetypeManager.getArchetypeByName('ArchetypeExample');
			should.exist(arch);
			arch.should.be.an.Object;
			arch.should.be.an.instanceof(Archetype);
			done();
		});
		it('the archetype should be removed to the manager', function(done){
			archetypeManager.removeArchetype('ArchetypeExample');
			should.not.exist(archetypeManager.getArchetypeByName('ArchetypeExample'));
			done();
		});
	});

	describe('#Entity & EntityManager Regression Tests', function(){
		var firstEntity = new Entity(null, 0);
		var entityManager = world.getEntityManager();

		it('Entity : existence features', function(done){
			should.exist(firstEntity);
			should.exist(firstEntity.getUID);
			should.exist(firstEntity.addComponent);
			should.exist(firstEntity.removeComponent);
			should.exist(firstEntity.hasComponent);
			should.exist(firstEntity.removeAllComponents);
			should.exist(firstEntity.getAllComponents);
			should.exist(firstEntity.getComponentsSet);
			done();
		});
		it('EntityManager : existence features', function(done){
			should.exist(entityManager);
			should.exist(entityManager.createEntity);
			should.exist(entityManager.createEntityWithArchetype);
			should.exist(entityManager.insert);
			should.exist(entityManager.remove);
			should.exist(entityManager.getEntityById);
			should.exist(entityManager.isActive);
			should.exist(entityManager.synchronize);
			done();
		});
		it('The empty entity should be added to the manager', function(done){
			entityManager.createEntity();
			should.exist(entityManager.getEntityById(0));
			done();
		});
		it('The Archetype entity should be added to the manager with default values', function(done){
			world.getArchetypeManager().addArchetype(jsonArch);
			entityManager.createEntityWithArchetypeName('ArchetypeExample');
			var entity = entityManager.getEntityById(1);
			should.exist(entity["WarriorComp"]);
			should.exist(entity["MageComp"]);
			(entity["WarriorComp"]).should.have.properties({heresy:10, combo:0});
			(entity["MageComp"]).should.have.properties({mana:42, flux:15});
			done();
		});
		it('The Archetype entity should be added to the manager without default value', function(done){
			world.getArchetypeManager().addArchetype(noDefaultValueArch);
			entityManager.createEntityWithArchetypeName('noDefaultValue');
			var entity = entityManager.getEntityById(2);
			should.exist(entity["WarriorComp"]);
			should.exist(entity["MageComp"]);
			(entity["WarriorComp"]).should.have.properties({heresy:10, combo:0});
			(entity["MageComp"]).should.have.properties({mana:10, flux:12});
			done();
		});
	});
});