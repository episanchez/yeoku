var fs = require('fs');

/**
 * World Configuration
 * Example : 
 * {
 *		"FileName" : "WorldConfiguration",
 *		"Version" : 0.1,
 *
 *		"ComponentsTypes": [
 *			{
 *				"name": "BasicComponent",
 *				"path": "./path/"
 *			},
 *			{
 *				"name" : "ExtendComponent",
 *				"path" : "./path" 
 *			}
 *		],
 *		"Systems": [
 *			{
 *				"name" : "BasicSystem"
 *				"path" : "./path/"
 *			},
 *			{
 *				"name" : "ExtendSystem",
 				"path" : "./path/"
 *			}
 *		],
 *		"OptManagers":[
 *		]	
 * }
 * @author episanchez
 * @class
 * @since 0.0.4
 */

var Path = require('path');

var WorldConfiguration = function(){
	this.componentsTypes = [];
	this.systems = [];
	this.optManagers = [];
};

module.exports = WorldConfiguration;

function checkAndPush(jsonObject, container, pathFile, isSystem){
	var obj = null;

	var newPath = Path.resolve(Path.dirname(pathFile) , jsonObject['path']);
	if (jsonObject['type'] === "Module"){	
		obj = require(newPath);
		var name = jsonObject["name"];
		if (isSystem === true)
			obj = new obj[name];
		else
			obj = obj[name];
	}
	else //we consider this one is equal to class with is own file
		obj = require(newPath);

	if (obj)
		container.push(obj);
};

function LoadPathInContainer(path, container){
	fs.readdir(path, function(err, files){
		if (err) throw err;
		for (var i = 0; i < files.length; i++){
			var pathFile = path + file[i];
			var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
			container.push(cObj);
		}
	});
};

WorldConfiguration.prototype.LoadConfFromFile = function(pathFile){
	// check pathFile
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

	var componentsTypes = cObj['ComponentsTypes'];
	var systems = cObj['Systems'];
	var optManagers = cObj['OptManagers'];

	for (var i = 0; i < componentsTypes.length; i++){
		var ct = componentsTypes[i];
		checkAndPush.call(this, ct, this.componentsTypes, pathFile);
	}
	for (var i = 0; i < systems.length;i++){
		checkAndPush.call(this, systems[i], this.systems, pathFile, true);
	}
	for (var i = 0; i < optManagers.length;i++){
		checkAndPush.call(this, optManagers[i], this.optManagers, pathFile);
	}
};

WorldConfiguration.prototype.LoadConfFromArrays = function(componentsTypes, systems, optManagers){
	if (componentsTypes)
		this.componentsTypes = componentsTypes;
	if (systems)
		this.systems = systems;
	if (optManagers)
		this.optManagers = optManagers;
};

WorldConfiguration.prototype.LoadConfFromPaths = function(componentsTypesPath, systemsPath, optManagersPath){
	LoadPathInContainer.call(this, componentsTypesPath);
	LoadPathInContainer.call(this, systemsPath);
	LoadPathInContainer.call(this, optManagersPath);
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

WorldConfiguration.prototype.clean = function(){
	this.componentsTypes = [];
	this.systems = [];
	this.optManagers = [];
};
