var fs = require('fs');

/*
 * Archetype Builder
 * @author episanchez
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

exp.buildArchetypeFromJson = function(jsonObj, world){
	var _name = jsonObj["name"];
	var arrComps = [];

	checkArchetypeObj.call(jsonObj, arrComps, world);
	return new Archetype(arrComps);
}
