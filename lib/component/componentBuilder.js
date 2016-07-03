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
exp.createComponentFromJson = function(jsonObj, cb){
  var object = function (values){
    this.init();
    if (values)
      this.update(values)
  };

  object.prototype = {
    addProp:  function(prop, value){
      this[prop] = value;
      this["get" + prop.charAt(0).toUpperCase() + prop.slice(1) ] = function(){
        return this[prop];
      };
      this["set" + prop.charAt(0).toUpperCase() + prop.slice(1) ] = function(val){
        this[prop] = val;
      };
    },
    dropProp:  function(prop){
      delete this[prop];
    },
    update:  function(attributes){
      for (prop in attributes){
        if (Object.prototype.hasOwnProperty.call(this, prop))
          this[prop] = attributes[prop];
      }
    },
    init: function(){
      var attributes = this.json["attributes"];

      this.addProp("name", this.json["name"]);
      for (prop in attributes){
        this.addProp(prop, attributes[prop]);
      }
    }
  }

  object.prototype.json = jsonObj;
  cb(object, jsonObj["name"]);
};


/**
 * Build a javascript Object (with getter/setter) from json file
 * @alias module:ComponentBuilder.buildComponentFromFile
 * @param {string} pathFile - the path of the json file
 * @return {Object} A Component Built
 */
exp.buildComponentFromFile = function(pathFile){
	var cObj = JSON.parse(fs.readFileSync(pathFile, 'utf8'));
  var comp = null;

	this.createComponentFromJson(cObj, function(obj, name){
      comp = obj;
  });
	return comp;
};
