var fs = require('fs');

/**
 * World Configuration
 * @author episanchez
 * @class
 * @since 0.0.4
 */

var WorldConfiguration = function(){
	this.componentsTypes = [];
	this.systems = [];
	this.optManagers = [];
};

module.exports = WorldConfiguration;

WorldConfiguration.prototype.LoadConfFromFile = function(pathFile){
	// check pathFile
	var cObj = require(pathFile);
};

WorldConfiguration.prototype.LoadConfFromArrays = function(componentsTypes, systems, optManagers){
	if (componentsTypes)
		this.componentsTypes = componentsTypes;
	if (systems)
		this.systems = systems;
	if (optManagers)
		this.optManagers = optManagers;
};

WorldConfiguration.prototype.LoadConfFromPaths = function(componentsTypesPath, systemsPath, optManagers){
	fs.readdir(componentsTypesPath, function(err, files){
		if (err) throw err;
		for (var i = 0; i < files.length; i++){
			var eObj = require(componentsTypesPath + '/' + files[i]);
			this.componentsTypes.push(eObj);
		}
	});

	fs.readdir(systemsPath, function(err, files){
		if (err) throw err;
		for (var i = 0; i < files.length; i++){
			var eObj = require(systemsPath + '/' + files[i]);
			this.systems.push(eObj);
		}
	});

	fs.readdir(optManagers, function(err, files){
		if (err) throw err;
		for (var i = 0; i < files.length; i++){
			var eObj = require(optManagers + '/' + files[i]);
			this.optManagers.push(eObj);
		}
	});
};

WorldConfiguration.prototype.getComponentsTypes = function(){
	return this.componentsTypes;
};

WorldConfiguration.prototype.getSystems = function(){
	return this.systems;
};

WorldConfiguration.prototype.getOptManagers = function(){
	return this.optManagers;
};
