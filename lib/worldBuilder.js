
var World = require('./world');
var WorldConfiguration = require('./worldConfiguration');

/**
 * A World Builder
 * @since 0.0.4
 * @author episanchez
 * @module WorldBuilder
 */

var exp = module.exports;

/**
 * Build a world with a World Configuration
 * @alias module:WorldBuilder.BuildWithWorldConfiguration
 * @param {WorldConfiguration}
 * @return {World}
 */
exp.BuildWithWorldConfiguration = function(worldConfiguration){
	var world = new World();

	var systems = worldConfiguration.getSystems();
	var componentsTypes = worldConfiguration.getComponentsTypes();
	var optManagers = worldConfiguration.getOptManagers();

	for (var i = 0; i < systems.length; i++){
		var system = systems[i];
		world.addSystem(system._name, system);
	}
	for (var i = 0; i < componentsTypes.length; i++){
		var component = componentsTypes[i];
		world.getComponentManager().create('test', component);
	}
	for (var i = 0; i < optManagers.length; i++){
		var optManager = optManagers[i];
		world.getAspectSubscriptionManager().registerManager(new optManager);
	}
	return world;
};

/**
 * Build an empty world
 * @alias module:WorldBuilder.BuildEmptyWorld
 * @return {World}
 */
exp.BuildEmptyWorld = function(){
	return new World();
};

