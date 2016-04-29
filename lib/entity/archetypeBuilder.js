var fs = require('fs');
var Archetype = require('entity/archetype');

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

function checkArchetypeObj(archObj, container, world){
	try{
		checkAttributes.call(this, archObj, "name");
		checkAttributes.call(this, archObj, "version");
		checkAttributes.call(this, archObj, "components");
		for (comp in archObj["components"]){
			var ct = world.getComponentManager().getComponentTypeByName(comp);
			if (!ct)
				throw 'Component : ' + comp + ' does not exist !';

			var objComp = archObj["components"][comp];
			for (attribute in objComp){
				if (!Object.prototype.hasOwnProperty.call(ct, attribute))
					throw 'This attribute : ' + attribute + '  into the next component : '+ comp + ' does not exist!';
			}
			container.push({name: comp, attributes: objComp});
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

	checkArchetypeObj.call(this, jsonObj, arrComps, world);
	return new Archetype(arrComps);
}
