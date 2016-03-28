var fs = require('fs');

/**
 * ArchetypeManager
 * @author episanchez
 * @since 0.0.5
 */

var ArchetypeManager = function(world){
	this.world = world;
	this.archetypes = {};
};

function checkAttributes(obj, attr){
	if (!obj[attr])
		throw 'Attribute : ' + attr + ' does not exist !';
}

function checkArchetypeObj(archObj, container){
	try{
		checkAttributes.call(this, archObj, "name");
		checkAttributes.call(this, archObj, "version");
		checkAttributes.call(this, archObj, "components");
		for (comp in archObj["components"]){
			var ct = this.world.getComponentManager().getComponentTypeByName(comp);
			if (ct){
				container.push(comp);
			}
			else
				throw 'Component : ' + comp + ' does not exist !';
		}
	}catch(err){
		throw err;
	}
}

module.exports = ArchetypeManager;

ArchetypeManager.prototype.loadArchetypeFromJson = function(jsonObj){
	var arrComps = [];

	checkArchetypeObj.call(this, jsonObj, arrComps);
	//create Archetype Object
}

ArchetypeManager.prototype.loadArchetypeFromFile = function(pathFile){
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
	this.loadArchetypeFromJson(cObj);
}

ArchetypeManager.prototype.loadArchetypeFromPath = function(pathDir){
	fs.readdir(pathDir, function(err, files){
		if (err) throw err;
		for (var i = 0; i < files.length; i++){
			var pathFile = path + '/' + file[i];
			this.loadArchetypeFromFile(pathFile);
		}
	});
}

ArchetypeManager.prototype.getArchetypes = function(){
	return this.archetypes;
}

ArchetypeManager.prototype.getArchetypeByName = function(name){
	return this.archetypes[name];
}

ArchetypeManager.prototype.removeArchetype = function(name){
	delete this.archetypes[name];
}