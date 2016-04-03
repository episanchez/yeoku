var fs = require('fs');
var exp = module.exports;

/**
 * Type class
 */

exp.createComponentFromJson = function(jsonObj){
	var obj = {};

	obj["ctype"] = null;
	obj["getComponentType"] = function(){
		return obj.ctype;
	};
	
	obj["setComponentType"] = function(val){
		obj.ctype = val;
	};

	var attr = jsonObj["attributes"];
	for (prop in attr){
		obj[prop] = attr[prop];
		obj["get" + prop.charAt(0).toUpperCase() + prop.slice(1) ] = function(){
			return obj[i];
		};
		obj["get" + prop.charAt(0).toUpperCase() + prop.slice(1) ] = function(val){
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