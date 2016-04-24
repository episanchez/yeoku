var fs = require('fs');
var Path = require('path');
var logger = require('winston');

/**
 * World Configuration
 * @author episanchez
 * @class
 */

var WorldConfiguration = function(){
	this.configPath = null;
	this.componentsTypes = [];
	this.systems = [];
	this.optManagers = [];
	this.archetypes = [];
};

module.exports = WorldConfiguration;


function checkElement(jsonObject, container, callback){
	// check Element form
	if (!this.configPath)
		throw 'path of configuration file is null !';
	if (!jsonObject.hasOwnProperty('type') || !jsonObject.hasOwnProperty('path'))
		throw 'Bad element form: check if you filled the type and the path of your element';

	var realPath = Path.resolve(Path.dirname(this.configPath), jsonObject["path"]);
	if (jsonObject['type'] === 'Directory'){
		fs.readdir(realPath, function (err, files){
			if (err) throw err;
			for (var i = 0; i < files.length; i++)
				callback(Path.resolve(realPath, files[i]), container);
		});
	}
	else if (jsonObject['type'] === 'Module'){
		if (!jsonObject.hasOwnProperty('name'))
			throw 'Bad element form : you did not filled the name of your element';
		var tmpObject = require(realPath);
		if (tmpObject && tmpObject.hasOwnProperty(jsonObject['name'])){
			var _name = jsonObject['name'];
			container.push(tmpObject[_name]);
		}
	}
	else if (jsonObject['type'] === 'Class')
		callback(realPath, container);
	else
		throw 'Bad Type :' + jsonObject["type"] ' in world configuration file';
}

function PushJsonElement(dataPath, container){
	var fullObj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	container.push(fullObj);
};

function PushJsElement(dataPath, container){
	var fullObj = require(dataPath);
	container.push(new fullObj);
};


WorldConfiguration.prototype.LoadConfFromFile = function(pathFile){
	// check pathFile
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

	this.configPath = pathFile;
	var componentsTypes = cObj['ComponentsTypes'];
	var systems = cObj['Systems'];
	var optManagers = cObj['OptManagers'];
	var archetypes = cObj['Archetypes'];

	try{
		for (var i = 0; i < componentsTypes.length; i++)
			checkElement.call(this, componentsTypes[i], this.componentsTypes, PushJsonElement);
		for (var i = 0; i < systems.length;i++)
			checkElement.call(this, systems[i], this.systems, PushJsElement);
		for (var i = 0; i < optManagers.length;i++){
			checkElement.call(this, optManagers[i], this.optManagers, PushJsElement);
		for (var i = 0; i < archetypes.length; i++)
			checkElement.call(this, archetypes[i], this.archetypes, PushJsonElement);
	}catch(err){
		logger.error('The Configuration file "' + pathFile + '" has the next error : ' + err);
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


WorldConfiguration.prototype.getComponentsTypes = function(){
	return this.componentsTypes;
};

WorldConfiguration.prototype.getSystems = function(){
	return this.systems;
};

WorldConfiguration.prototype.getOptManagers = function(){
	return this.optManagers;
};

WorldConfiguration.prototype.getArchetypes = function(){
	return this.archetypes;
};

WorldConfiguration.prototype.clean = function(){
	this.configPath = null;
	this.componentsTypes = [];
	this.systems = [];
	this.optManagers = [];
	this.archetypes = [];
};
