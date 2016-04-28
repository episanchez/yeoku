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

function PushJsonElement(dataPath, container){
	var fullObj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	container.push(fullObj);
};

function PushJsElement(dataPath, container){
	var fullObj = require(dataPath);
	container.push(new fullObj);
};

function PushModuleElement(jsonObject, datapath, constainer){
	var obj = null;

	if (jsonObject['fileExtension'] === 'js')
		obj = require(datapath);
	else if (jsonObject['fileExtension'] === 'json') {
		var tmpObj = JSON.parse(fs.readFileSync(datapath, 'utf8'));
		if (tmpObj && tmpObj['objects'])
			obj = tmpObj['objects'];
	}
	else
		throw 'Did not fill the fileExtension row';

	if (!obj)
		throw 'Object does not exist !';

	if(jsonObject['name']){
		var _name = jsonObject['name'];
		if (Object.prototype.hasOwnProperty.call(obj, _name)){
			container.push(obj[_name]);
	} 
	else {
		for (var key in obj)
			if (Object.prototype.hasOwnProperty.call(obj, key))
				container.push(key);
		}
	}
};

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
		PushModuleElement(jsonObject, realPath, container);
	}
	else if (jsonObject['type'] === 'Class')
		callback(realPath, container);
	else
		throw 'Bad Type :' + jsonObject["type"] + ' in world configuration file';
};


WorldConfiguration.prototype.LoadConfFromFile = function(pathFile){
	// check pathFile
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

	this.configPath = pathFile;
	var componentsTypes = cObj['ComponentsTypes'];
	var systems = cObj['Systems'];
	var optManagers = cObj['OptManagers'];
	var archetypes = cObj['Archetypes'];

	for (var i = 0; i < componentsTypes.length; i++)
		checkElement.call(this, componentsTypes[i], this.componentsTypes, PushJsonElement);
	for (var i = 0; i < systems.length;i++)
		checkElement.call(this, systems[i], this.systems, PushJsElement);
	for (var i = 0; i < optManagers.length;i++)
		checkElement.call(this, optManagers[i], this.optManagers, PushJsElement);
	for (var i = 0; i < archetypes.length; i++)
		checkElement.call(this, archetypes[i], this.archetypes, PushJsonElement);
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
