# Yeoku
Yeoku is an Entity-Component-System(ECS) framework in javascript based on Artemis-odb (https://github.com/junkdog/artemis-odb).

API Documentation : http://episanchez.github.io/yeoku/

## Installation

```
npm install yeoku
```

## Documentation

### World

The world is a main piece of the framework, this one contains your entities, your systems and your components.

Upon the world instanciation, all systems and managers initialized.

#### Processing World

In this case, we process the world every 100 miliseconds
```javascript
var World = require('yeoku').World;

var world1 = new World();

while (42){
	world.process();
	sleep(100);
}
```

### Component

Components are a pure data classes (getter/setter) with optionally some helpers methods

#### Create your own component

If you want to create your own Component, you have to inherit from 'yeoku.Component' and create a component Type related to this class.

```javascript
// components.js
var BaseComponent = require('yeoku').Component;
var ComponentType = require('yeoku').ComponentType;
var util = require('util');

var exp = module.exports;
/**
 * Deprecated (<= 0.0.3)
 */
var OldComponent = exp.OldComponent =  function(){
	BaseComponent.call(this, new ComponentType(0, 'OldComponent', this)); // params {id, name, copy of the component}	

	this.intData = 0;
	this.rawData = null;
};

util.inherits(OldComponent, BaseComponent);

OldComponent.prototype.getIntData = function(){
	return this.intData;
};

OldComponent.prototype.getRawData = function(){
	return this.rawData;
};

OldComponent.prototype.setIntData = function(intValue){
	this.intData = intValue;	
};

OldComponent.prototype.setRawData = function(rawValue){
	this.rawData = rawValue;
};

/**
 * Since 0.0.4
 */
var NewComponent = exp.NewComponent = function(){
	// With componentManager
	BaseComponent.call(this, {name: "NewComponent"});	

	/*
	 * Without ComponentManager
	 * example : BaseComponent.call(this, {id: 0, name: "NewComponent"})
	 */
	this.intData = 0;
	this.rawData = null;
};

util.inherits(NewComponent, BaseComponent);

NewComponent.prototype.getIntData = function(){
	return this.intData;
};

NewComponent.prototype.getRawData = function(){
	return this.rawData;
};

NewComponent.prototype.setIntData = function(intValue){
	this.intData = intValue;	
};

NewComponent.prototype.setRawData = function(rawValue){
	this.rawData = rawValue;
};

```


#### Add/delete Component Class

You have to use the ComponentManager, this one has a array of your Component Classes and a double array of the componentType by entities.

```javascript
var OldComponent = require('./components').OldComponent;
var NewComponent = require('./components').NewComponent;
/**
 * Deprecated (<= 0.0.3)
 */
world.getComponentManager().create("OldComponent", OldComponent); // params {name, Component Class}

world.getComponentManager().getComponentTypeByName("OldComponent"); // give the component type
world.getComponentManager().removeComponentType("OldComponent");
world.getComponentManager().getComponentTypeByName("OldComponent"); // undefined

/**
 * Since 0.0.4
 */
world.getComponentManager().create("NewComponent", NewComponent);

world.getComponentManager().getComponentTypeByName("NewComponent"); // give the component type
world.getComponentManager().removeComponentType("NewComponent");
world.getComponentManager().getComponentTypeByName("NewComponent"); // undefined
```

### Entity

Entity are containers of related components.

#### Create Entity

Entities managed by EntityManager, this one could be created it, deleted it. 
Each entity has a copy of ComponentsManager, with this one, you can add/delete a component to the entity.

```javascript
world.getEntityManager().createEntity();
```

#### Add/delete Component to the Entity

```javascript
world.getEntityManager.createEntity();

var soldier = world.getEntityManager().getEntityById(0); // Give the entity last created
soldier.addComponent("BasicComponent");
soldier.hasComponent("BasicComponent"); // has to return true

soldier.removeComponent("BasicComponent");
soldier.hasComponent("BasicComponent");
```

#### Querying for entities

Systems have built in mechanisms for finding entities which have a specific set of Components (see Aspect).

### System

Systems encapsulate game logic, typically operating on a family of entities.

#### Create a system

* Extend to a specialized system class (for exemple, intervalSystem or IteratingSystem)
* Register it on your world

##### Example

*your own system : 

```javascript
// exampleSystem.js : This system inherits from iteratingSystem

var IteratingSystem = require('yeoku').IteratingSystem;
var util = require('util');

var ExampleSystem = function (){
	IteratingSystem.call(this);
};

util.inherits(ExampleSystem, IteratingSystem);

// When the system added, the world initialized it.
ExampleSystem.prototype.initialize = function(){
	this.buildAspectWithComponentsTypeName(["BasicComponent"], [], []); // build an Aspect with the name of componentType that you need all of them, just one of them or exclude all of them
	IteratingSystem.prototype.initialize.call(this);
};

// params {Integer} the entity id
ExampleSystem.prototype.processEntity(entity){
	var soldier = world.getEntityManager.getEntityById(entity);

	soldier.BasicComponent.setIntData(42);
	soldier.BasicComponent.setRawData("42");
};

module.exports = ExampleSystem;
```

*registration of your system and process it :
```javascript
var ExampleSystem = require('./exampleSystem');
var OldComponent = require('./OldComponent');

var testWorld = new World();

// you need to add your Components before your systems
testWorld.getComponentManager().addComponent("OldComponent", OldComponent);

// Add your system
testWorld.addSystem("ExampleSystem", ExampleSystem); // param {name, class}

// add an Entity with its components
testWorld.getEntityManager().create();
var soldier = world.getEntityManager().getEntityById(0); // Give the entity last created
soldier.addComponent("BasicComponent");

// process World (this one process all your system)
testWorld.process();

soldier.BasicComponent.getIntData(); // result : 42
soldier.BasicComponent.getRawData(); // result : "42"
```

#### Skip Processing

Override checkProcessing to return false if you want to skip the system during processing.

### Aspect

Aspects match Entities based on a Component pattern, defining the type of entities a system is interested in. Instead of thinking of systems processing entities, they rather process aspects of entities.

### WorldBuilder/WorldConfiguration (Since > 0.0.4)

#### Load From Arrays

You load all your class prototype or your instance of component, system, register.

```javascript
var WorldBuilder = require('yeoku').WorldBuilder;
var WorldConfiguration = require('yeoku').WorldConfiguration;

var wc = new WorldConfiguration();
wc.LoadConfFromArrays([OldComponent, NewComponent], [new ExampleSystem()], []);
var testWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
testWorld.getSystem('ExampleSystem'); // return ExampleSystem Object

var entity = mWorld.em.getEntityById(0);
entity.addComponent('NewComponent'); 

testWorld.getComponentManager().getComponentTypeByName('NewComponent'); // should be give a NewComponent's type
(entity.WarriorComp); // should be have the next properties {rawData: null, intData:0}
```

#### Load From Configuration File

##### Configuration File

Specify all your componentsTypes, systems and managers with their type and path.
Example configuration file :
```json
{
	"FileName":"WorldConf",
	"Version": 0.1,

	"ComponentsTypes": [
		{
			"name": "OldComponent",
			"type": "Module", // Class : Only one object by file, Module : Several Objects by file
			"path": "./components"
		},
		{
			"name": "NewComponent",
			"type": "Module",
			"path": "./components"
		}
	],
	"Systems": [
		{
			"name" : "ExampleSystem",
			"type": "Class",
			"path": "./exampleSystem"
		}
	],
	"OptManagers":[]
}
```

##### Build with the configuration file

```
wc = new WorldConfiguration();
wc.LoadConfFromFile(__dirname + '/conf/worldConf.json');
var testWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
testWorld.getSystem('ExampleSystem'); // return ExampleSystem Object

var entity = mWorld.em.getEntityById(0);
entity.addComponent('NewComponent'); 

testWorld.getComponentManager().getComponentTypeByName('NewComponent'); // should be give a NewComponent's type
(entity.WarriorComp); // should be have the next properties {rawData: null, intData:0}
```

## Todo

- Don't call the super when the class are not instanciated
- Entity Archetype (Build with componentManager in the World or with Component Class)
- Implement should sync entity system and delayed systems

##License

The MIT License (MIT)

Copyright (c) 2016 Charlie QUILLARD

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.