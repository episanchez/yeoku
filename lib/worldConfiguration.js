var fs = require('fs');
var Path = require('path');
var logger = require('winston');

/**
 * Load World Configuration from json file
 * @author episanchez
 * @class
 */
var WorldConfiguration = function(){
	/**
	 * @member {string} configPath - The path of the configuration file
	 * @memberof WorldConfiguration
	 */
	this.configPath = null;
	/**
	 * @member {array} componentsTypes - Array of components json object
	 * @memberof WorldConfiguration
	 */
	this.componentsTypes = [];
	/**
	 * @member {array} systems - Array of systems object
	 * @memberof WorldConfiguration
	 */
	this.systems = [];
	/**
	 * @member {array} optManagers - Array of optionnal managers object
	 * @memberof WorldConfiguration
	 */
	this.optManagers = [];
	/**
	 * @member {array} archetypes - Array of archetypes json object
	 * @memberof WorldConfiguration
	 */
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

function PushModuleElement(jsonObject, datapath, container){
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
			container.push(new obj[_name]);
		}
	} 
	else {
		for (var key in obj){
			if (Object.prototype.hasOwnProperty.call(obj, key)){
				container.push(obj[key]);
			}
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

/**
 * Load the world configuration from json file
 * @param {string} pathFile - The path of world configuration file
 */
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

/**
 * Get the components' array
 * @return {number} Array of json component
 */
WorldConfiguration.prototype.getComponentsTypes = function(){
	return this.componentsTypes;
};

/**
 * Get the systems' array
 * @return {number} Array of systems
 */
WorldConfiguration.prototype.getSystems = function(){
	return this.systems;
};

/**
 * Get the optManagers' array
 * @return {number} Array of optManagers
 */
WorldConfiguration.prototype.getOptManagers = function(){
	return this.optManagers;
};

/**
 * Get the archetypes' array
 * @return {array} Array of archetypes 
 */
WorldConfiguration.prototype.getArchetypes = function(){
	return this.archetypes;
};

/**
 * Clean all attributes of the world configuration
 */
WorldConfiguration.prototype.clean = function(){
	this.configPath = null;
	this.componentsTypes = [];
	this.systems = [];
	this.optManagers = [];
	this.archetypes = [];
};
