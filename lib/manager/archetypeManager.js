var fs = require('fs');
var Archetype = require('entity/archetype');

/**
 * ArchetypeManager
 * @author episanchez
 */

var ArchetypeManager = function(world){
	this.world = world;
	this.archetypes = {};
};

module.exports = ArchetypeManager;

// json Object
ArchetypeManager.prototype.addArchetype = function(jsonArchetype){
	var arch = require('entity/archetypeBuilder').buildArchetypeFromJson(jsonArchetype);

	var _name = jsonArchetype["name"];
	this.archetypes[_name] = arch;
};

ArchetypeManager.prototype.getArchetypes = function(){
	return this.archetypes;
};

ArchetypeManager.prototype.getArchetypeByName = function(name){
	return this.archetypes[name];
};

ArchetypeManager.prototype.removeArchetype = function(name){
	if (this.archetypes[name])
		delete this.archetypes[name];
}