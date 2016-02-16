var should = require('should');

var Aspect = require('../lib/aspect/aspect');
var Entity = require('../lib/entity');
var ComponentType = require('../lib/component/componentType');

describe('AspectTest', function() {
  var aspect1 = new Aspect();
  var aspect2 = new Aspect();
  var entity1 = new Entity(null, 0);
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
    	(aspect2.isInterested(entity1)).should.be.equal(true);
    	done();
    });
  });
  describe('#EntitySubscription Test', function(){
  	//todo
  });
  describe('#AspectSubscription Test', function(){
  	//todo
  });
});