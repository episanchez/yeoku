var fs = require('fs');

/**
 * Build a component with getter/Setter from Json Object or Json file
 * @author episanchez
 * @module ComponentBuilder
 */
 var exp = module.exports;

/**
 * Create a javascript Object (with getter/setter) from json Object
 * @alias module:ComponentBuilder.createComponentFromJson
 * @param {Object} jsonObj - A component json object (see example componentExample.json)
 * @return {Object} A Component Built
 */
exp.createComponentFromJson = function(jsonObj){
	var obj = {};

	obj["typeName"] = jsonObj["name"];
	var attr = jsonObj["attributes"];
	for (prop in attr){
		obj[prop] = attr[prop];
		obj["get" + prop.charAt(0).toUpperCase() + prop.slice(1) ] = function(){
			return obj[i];
		};
		obj["set" + prop.charAt(0).toUpperCase() + prop.slice(1) ] = function(val){
			obj[i] = val;
		};
	}
	return obj;
};

/**
 * Build a javascript Object (with getter/setter) from json file
 * @alias module:ComponentBuilder.buildComponentFromFile
 * @param {string} pathFile - the path of the json file
 * @return {Object} A Component Built
 */
exp.buildComponentFromFile = function(pathFile){
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

	var comp = this.createComponentFromJson(cObj);
	return comp;
};
