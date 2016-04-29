var fs = require('fs');

/*
 * Build an archetype from a json object
 * @author episanchez
 * @module ArchetypeBuilder
 */

var exp = module.exports;

function checkAttributes(obj, attr){
	if (!obj[attr])
		throw 'Attribute : ' + attr + ' does not exist !';
}

function checkComponents(obj, target){
	for (key in obj){
		if (!target[key])
			return false;
	}
	return true;
}

function checkArchetypeObj(archObj, container, world){
	try{
		checkAttributes.call(this, archObj, "name");
		checkAttributes.call(this, archObj, "version");
		checkAttributes.call(this, archObj, "components");
		for (comp in archObj["components"]){
			var ct = world.getComponentManager().getComponentTypeByName(comp);
			if (ct && checkComponents.call(comp, ct)){
				container.push(comp);
			}
			else
				throw 'Component : ' + comp + ' does not exist !';
		}
	}catch(err){
		throw err;
	}
}

/**
 * Build an archetype from a json object
 * @param {Object} jsonObj - A json archetype
 * @param {World} world - A world object
 * @return {Archetype} An archetype object
 */
exp.buildArchetypeFromJson = function(jsonObj, world){
	var _name = jsonObj["name"];
	var arrComps = [];

	checkArchetypeObj.call(jsonObj, arrComps, world);
	return new Archetype(arrComps);
}
