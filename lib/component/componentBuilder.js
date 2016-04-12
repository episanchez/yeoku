var fs = require('fs');
var exp = module.exports;

/**
 * Type class
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

exp.buildComponentFromFile = function(pathFile){
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

	var comp = this.createComponentFromJson(cObj);
	return comp;
};
