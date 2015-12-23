/**
 * An Aspect is used by systems as a matcher to check if this one is interested by the entity.
 * @author : episanchez
 */

var ArrayUtils = require('../../util/arrayUtils');

var Aspect = function(){
	this.allSet = []; // The entity must have all component of this set
	this.oneSet = []; // The entity must have one component of this set 
	this.excludeSet = []; // The entity must haven't all component of this set
};

module.exports = Aspect;

Aspect.prototype.getAllIds = function(){
	return this.allSet;
};

Aspect.prototype.getOneIds = function(){
	return this.oneSet;
};

Aspect.prototype.getExcludeIds = function(){
	return this.excludeSet;
};

Aspect.prototype.isInterested = function(entity){
	var componentSet = entity.getComponentSet();

	for (id in this.allSet){
		if (componentSet.indexOf(id) === -1)
			return false
	}

	if (ArrayUtils.isIntersect(this.excludeSet, componentSet) === true)
		return false;
	if (ArrayUtils.isIntersect(this.oneSet, componentSet) === false)
		return false;
	return true;
};

Aspect.prototype.buildAll = function(componentSet){
	if (componentSet instanceof Array){
		this.allSet.concat(componentSet);
	}
};

Aspect.prototype.buildOne = function(componentSet){
	if (componentSet instanceof Array){
		this.oneSet.concat(componentSet);
	}
};

Aspect.prototype.buildExclude = function(componentSet){
	if (componentSet instanceof Array){
		this.excludeSet.concat(componentSet);
	}
};
