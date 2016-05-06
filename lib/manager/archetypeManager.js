var fs = require('fs');
var Archetype = libRequire('entity/archetype');

/**
 * ArchetypeManager
 * @author episanchez
 * @class
 * @param {World} world - A world instance
 */

var ArchetypeManager = function(world){
	/**
	 * @member {World} world - Copy of World instance
	 * @memberof ArchetypeManager
	 */
	this.world = world;
	/**
	 * @member {Object} archetypes - A set of archetypes
	 * @memberof ArchetypeManager
	 */
	this.archetypes = {};
};

module.exports = ArchetypeManager;

/**
 * Build and Add an archetype to the manager
 * @param {jsonArchetype} jsonArchetype - A json archetype object
 */
ArchetypeManager.prototype.addArchetype = function(jsonArchetype){
	var arch = require('entity/archetypeBuilder').buildArchetypeFromJson(jsonArchetype, this.world);

	var _name = jsonArchetype["name"];
	this.archetypes[_name] = arch;
};

/**
 * Get a set of archetypes
 * @return {Object} Set of archetypes
 */
ArchetypeManager.prototype.getArchetypes = function(){
	return this.archetypes;
};

/**
 * Get an archetype by name
 * @param {string} name - The name of the archetype
 * @return {Archetype} An archetype object
 */
ArchetypeManager.prototype.getArchetypeByName = function(name){
	return this.archetypes[name];
};

/**
 * Remove an archetype
 * @param {string} name - The name of the archetype
 */
ArchetypeManager.prototype.removeArchetype = function(name){
	if (this.archetypes[name])
		delete this.archetypes[name];
}