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

    it ('Build with StrResult and getted Aspect StrResult should be worked', function(done){
      var localAspect = new Aspect();

      localAspect.buildWithStrResult('1,2,3#4,5#6,7');
      localAspect.should.have.properties({allSet : [1,2,3], oneSet: [4,5], excludeSet : [6,7]});

      localAspect.getStrResult().should.be.eql('1,2,3#4,5#6,7');
      done();
    });

    it ('aspect1 should be equal to aspect2', function(done){
      aspect1.equals('3,2,1##5,4').should.be.true;
      done();
    });

  });

  describe('#EntitySubscription Test', function(){
  	var entitySubscription1 = new EntitySubscription(aspect1, null);

  	it ('EntitySubscription Object should be created', function(done){
  		should.exist(entitySubscription1);
  		should.exist(entitySubscription1.checkEntity);
  		should.exist(entitySubscription1.informEntityChanges);
  		should.exist(entitySubscription1.process);
  		should.exist(entitySubscription1.addSubscriptionListener);
  		done();
  	});

  	it ('Entity2 should be inserted', function(done){
  		entitySubscription1.checkEntity(entity1);
  		entitySubscription1.checkEntity(entity2);
  		entitySubscription1.checkEntity(entity3);

  		entitySubscription1.should.have.properties({activeEntitiesId: [1], insertedIds: [1]});
  		done();
  	});

    var vInsertedIds = [];
    var vRemovedIds = [];
    it ('Listener should be added', function(done){
      entitySubscription1.addSubscriptionListener({inserted : function(ids){ vInsertedIds = ids; } , removed : function (ids){ vRemovedIds = ids; } });

      (entitySubscription1.listeners.length).should.be.equal(1);
      should.exist(entitySubscription1.listeners[0].removed);
      should.exist(entitySubscription1.listeners[0].inserted);
      done();
    });

    it ('Process and informEntityChanges should be worked', function(done){
      entitySubscription1.activeEntitiesId = [0,1,2,3,4,5,6];
      entitySubscription1.insertedIds = [];

      entitySubscription1.process([1,2,4], [3,5,6]);
      vInsertedIds.should.be.eql([1,2,4]);
      vRemovedIds.should.be.eql([3,5,6]);

      //entitySubscription1.activeEntitiesId.should.be.equal([0,1,2,4]);
      done();
    });
  	//todo
  });
  describe('#AspectSubscriptionManager Test', function(){
    var w1 = new World();

    it('EntitySubscription should be created', function(done){

      w1.aspectSubscriptionManager.createSubscription(aspect1);
      w1.aspectSubscriptionManager.createSubscription(aspect2);

      var asStr1 = w1.aspectSubscriptionManager.EntitySubscriptions[aspect1.getStrResult()];
      var asStr2 = w1.aspectSubscriptionManager.EntitySubscriptions[aspect2.getStrResult()];

      should.exist(asStr1);
      should.exist(asStr2);


      asStr1.should.be.an.Object;
      asStr2.should.be.an.Object;


      asStr1.aspect.should.have.properties({allSet : [1,2,3], oneSet: [], excludeSet : [4,5]});
      asStr2.aspect.should.have.properties({allSet : [2,3], oneSet: [1,5], excludeSet : []});
      done();
    });

    it('EntitySubscription should be getted', function(done){

      var es1 = w1.aspectSubscriptionManager.getSubscription(aspect1);
      var es2 = w1.aspectSubscriptionManager.getSubscription(aspect2);

      should.exist(es1);
      should.exist(es2);

      es1.getAspect().should.have.properties({allSet : [1,2,3], oneSet: [], excludeSet : [4,5]});
      es2.getAspect().should.have.properties({allSet : [2,3], oneSet: [1,5], excludeSet : []});
      done();
    });

  	//todo
  });
});