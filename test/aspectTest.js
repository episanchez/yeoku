var should = require('should');

var World = require('../lib/world');
var Aspect = require('../lib/aspect/aspect');
var EntitySubscription = require('../lib/aspect/entitySubscription');
var Entity = require('../lib/entity');
var ComponentType = require('../lib/component/componentType');

describe('AspectTest', function() {
  /**
   * mock data
   */
  var aspect1 = new Aspect();
  var aspect2 = new Aspect();
  
  var entity1 = new Entity(null, 0);
  var entity2 = new Entity(null, 1);
  var entity3 = new Entity(null, 2);

  entity2._ComponentsSet = [1,2,3];
  entity3._ComponentsSet = [2,3,4];

  describe('#Aspect Regression Test', function() {
    it ('Aspect Object should be created', function(done){
    	should.exist(aspect1);
    	should.exist(aspect1.buildAll);
    	should.exist(aspect1.buildOne);
    	should.exist(aspect1.buildExclude);
    	should.exist(aspect1.isInterested);
    	done();
    });
    it ('Component Sets (All, One, Exclude) should be built', function(done){
    	aspect1.buildAll([1,2,3]);
		aspect1.buildExclude([4,5]);
    	aspect2.buildAll([2,3]);
		aspect2.buildOne([1,5]);

		aspect1.should.have.properties({allSet : [1,2,3], oneSet: [], excludeSet : [4,5]});
		aspect2.should.have.properties({allSet : [2,3], oneSet: [1,5], excludeSet : []});
    	done();
    });
    it ('Entity should be matched with aspect2 and not with aspect1', function(done){
    	entity1._ComponentsSet = [2,3,5];

    	(aspect1.isInterested(entity1)).should.be.equal(false);
    	(aspect1.isInterested(entity2)).should.be.equal(true);
    	(aspect1.isInterested(entity3)).should.be.equal(false);

    	(aspect2.isInterested(entity1)).should.be.equal(true);
    	(aspect2.isInterested(entity3)).should.be.equal(false);
    	done();
    });
  });

  var world = new World();
  describe('#EntitySubscription Test', function(){
  	var entitySubscription1 = new EntitySubscription(world, aspect1);

  	it ('EntitySubscription Object should be created', function(done){
  		should.exist(entitySubscription1);
  		should.exist(entitySubscription1.checkEntity);
  		should.exist(entitySubscription1.informEntityChanges);
  		should.exist(entitySubscription1.process);
  		should.exist(entitySubscription1.addSubscriptionListener);
  		done();
  	});

  	it ('Entity2 should be inserted', function(done){
  		//console.log('allSet : ' + entitySubscription1.aspect.allSet);
  		//console.log('entity set : ' + entity2._ComponentsSet);
  		entitySubscription1.checkEntity(entity1);
  		entitySubscription1.checkEntity(entity2);
  		entitySubscription1.checkEntity(entity3);

  		entitySubscription1.should.have.properties({activeEntitiesId: [1], insertedIds: [1]});
  		done();
  	});
  	//todo
  });
  describe('#AspectSubscriptionManager Test', function(){
  	//todo
  });
});