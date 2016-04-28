var should = require('should');

var Archetype = require('entity/archetype');
var ArchetypeBuilder = require('entity/archetypeBuilder');
var Entity = require('entity/entity');

var EntityManager = require('manager/entityManager');
var ArchetypeManager = require('manager/archetypeManager');

describe('Entity Features Testing', function(){
	describe('#Archetype & ArchetypeBuilder & ArchetypeManager Regression Tests', function(){
		it('Archetype : existence features', function(done){
			should.exist(Archetype);
			should.exist(Archetype.getComponents);
			should.exist(Archetype.addComponent);
			should.exist(Archetype.setComponents);
			done();
		});
		it('ArchetypeBuilder : existence features', function(done){
			should.exist(ArchetypeBuilder);
			should.exist(ArchetypeBuilder.buildArchetypeFromJson);
			done();
		});
		var archetypeManager = new ArchetypeManager(null);
		it('ArchetypeManager: existence features', function(done){
			should.exist(archetypeManager);
			should.exist(archetypeManager.addArchetype);
			should.exist(archetypeManager.getArchetypes);
			should.exist(archetypeManager.getArchetypeByName);
			should.exist(archetypeManager.removeArchetype);
			done();
		});
	});
	describe('#Entity & EntityManager Regression Tests', function(){
		var firstEntity = new Entity(null, 0);
		var secondEntity = new Entity(null, 0);
		var entityManager = new EntityManager();

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
		});
	});
});