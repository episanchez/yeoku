# Yeoku
Yeoku is an Entity-Component-System(ECS) framework in javascript based on Artemis-odb (https://github.com/junkdog/artemis-odb).

API Documentation : http://episanchez.github.io/yeoku/

ps : If you use the old version of yeoku (0.0.x) , you need to migrate your code in following the next documentation. This version is not compatible with the older versions.
## Installation

```
npm install yeoku
```

## Documentation

### World

The world is a main piece of the framework, this one contains your entities, your systems and your components.

Upon the world instanciation, all systems and managers initialized.

#### Build a World from a configuration file

It is advisable to build your world from a json configuration file because it is easier for loading all your systems, optionnal managers, components and archetypes.

##### Make your Configuration file

For each elements that you want to load, you need to specify the type, the file extension (json or js) and the path of the element's file or directory.
For the type attribute, you can select if the element is a module or into a module, a class or directory.
If the element is into a module, you have to add an attribute "name" and fill it with the element's name.

```json
{
	"FileName":"WorldConf",
	"Version": 0.3,
	"ComponentsTypes": [
		{
			"type": "Class",
			"fileExtension": "json",
			"path": "./componentExample.json"
		},
		{
			"type": "Module",
			"fileExtension": "json",
			"path": "./mockComponents.json"
		}
	],
	"Systems": [
		{
			"name" : "BasicSystem",
			"type": "Module",
			"fileExtension": "js",
			"path": "../mockData"
		},
		{
			"name" : "ExtendSystem",
			"type": "Module",
			"fileExtension": "js",
			"path" : "../mockData"
		}
	],
	"OptManagers":[],
	"Archetypes": [
		{
			"type": "Class",
			"fileExtension": "json",
			"path": "./archetypeExample.json"
		},
		{
			"type": "Module",
			"fileExtension": "json",
			"path": "./mockArchetypes.json"
		}
	]
}
```
#### Load your configuration file and build a world with it

For beginning, you have to create a WorldConfiguration Object and load your json configuration file. When your configuration loading got well, you can build your World with WorldBuilder and your WorldConfiguration Object. After these steps, your World Object is built and you can use it.


```javascript
var WorldConfiguration = require('yeoku').WorldConfiguration;
var WorldBuilder = require('yeoku').WorldBuilder;

// create a WorldConfiguration Object and load a json file
wc = new WorldConfiguration();
wc.LoadConfFromFile(__dirname + 'worldConf.json');

//Build your new World with WorldBuilder
var testWorld = WorldBuilder.BuildWithWorldConfiguration(wc);
testWorld.getSystem('BasicSystem'); // return ExampleSystem Object
```

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

#### Create a json component

Create a json component is very simple, for each one, you need specify the name, the type (Module), the version and the attributes and for each attribute, you need the name and the value (for example : "name":"value").

A json Class Component :

```json
{
	"name": "ComponentExample",
	"type": "Class",
	"version": 0.2,
	"attributes":{
		"attr1": 20,
		"attr2": 30
	}
}
```

To simplify the components making, you could create a json components' module, you need specify the name, the type (Module), the version and all the components' object. You could following the next example :

```json
{
	"name": "mockComponents",
	"type": "Module",
	"version":0.3,
	"objects":{
		"WarriorComp":{
			"name": "WarriorComp",
			"attributes":{
				"heresy":10,
				"combo":0
			}
		},
		"MageComp":{
			"name": "MageComp",
			"attributes":{
				"mana":42,
				"flux":15
			}
		}
	}
}
```

#### Build Your Component separatly of WorldBuilder With ComponentBuilder

If you want to build your component separatly of WorldBuilder, you can use ComponentBuilder. When you object is built, you can create instances of this one with "Object.create(genericObject)".

```javascript
var ComponentBuilder = require('yeoku').ComponentBuilder;

var lc = ComponentBuilder.buildComponentFromFile(__dirname + 'ComponentExample.json');

// First Instance
var c1 = Object.create(lc);
// Second Instance
var c2 = Object.create(lc);
```

#### Add or Delete a Component

If you want add or delete a component of your world, you have to use the component manager, this one add or delete the component and add or delete component instances.

```javascript
var World = require('yeoku').World;
var ComponentBuilder = require('yeoku').ComponentBuilder;
var world = new World();
// build your component
var lc = ComponentBuilder.buildComponentFromFile(__dirname + 'ComponentExample.json');

// Add your component to the manager
world.getComponentManager().create(lc);
world.getComponentManager().getComponentTypeByName("ComponentExample"); // give the component type

// Remove your component to the manager
world.getComponentManager().removeComponentType("ComponentExample");
world.getComponentManager().getComponentTypeByName("ComponentExample"); // undefined
```


### Entity

Entity are containers of related components.

#### Make your Archetype

The Archetype is an entity's template with all related components and sometimes default value of components' attributes. For example, you could have a player archetype or mob archetype.

You could make a simple archetype, following the next example : 

```json
{
	"name": "ArchetypeExample",
	"type": "Class",
	"version": 0.2,
	"components":{
		//without default value
		"WarriorComp":{},
		//with default value
		"MageComp":{
			"mana":42,
			"flux":15
		}
	}
}
```

or you could make a module archetype, following the next example :

```json
{
	"name": "MockArchetypes",
	"type": "Module",
	"version": 0.3,
	"objects":{
		//Warrior Archetype
		"Warrior":{
			"name": "Warrior",
			"components":{
				"WarriorComp":{
					"heresy":42,
					"combo":42
				}
			}
		},
		//Mage Archetype
		"Mage":{
			"name": "Mage",
			"components":{
				"MageComp":{
					"mana":84,
					"flux":84
				}
			}
		}
	}
}
```

#### Build your archetype without archetype manager

If you want to build an archetype without its manager, you can use the archetype builder with a json archetype and world objects. You have to load the components related to the archetype before building your archetype because these ones are checked.

```javascript
// ... {world}
var jsonArchetype = {
			name: 'ArchetypeExample',
			version: 0.2,
			components:{
				WarriorComp:{
					heresy:10,
					combo:0
				},
				MageComp:{
					mana:42,
					flux:15
				}
			}
		};
var ArchetypeBuilder = require('yeoku').ArchetypeBuilder;

var archetype = ArchetypeBuilder.buildArchetypeFromJson(jsonArchetype, world);
```

#### Add or Remove your archetype to the manager

You can add or remove your archetype with the archetype manager.

```javascript
// ... {world, jsonArchetype}

// add the archetype to the manager
world.getArchetypeManager().addArchetype(jsonArchetype);
world.getArchetypeManager().getArchetypeByName('ArchetypeExample'); // return Archetype
// remove the archetype to the manager
world.getArchetypeManager().removeArchetype('ArchetypeExample');
world.getArchetypeManager().getArchetypeByName('ArchetypeExample'); // return undefined
```

#### Create Entity

##### Create Entity without archetype

Entities managed by EntityManager, this one could be created it, deleted it. 
Each entity has a copy of ComponentsManager, with this one, you can add/delete a component to the entity.

```javascript
// ... {world}
world.getEntityManager().createEntity();
```

##### Create Entity With Archetype

You can create an entity with the name of the archetype as "Player" or "Mob" , if you loaded it before.

```javascript
// ... {world}
testWorld.getEntityManager().createEntityWithArchetypeName('ArchetypeExample');
```

##### Add or Delete Component to the Entity

You can add a component to an entity with the next methods : addComponent and removeComponent of your Entity instances.

```javascript
world.getEntityManager().createEntity();

var soldier = world.getEntityManager().getEntityById(0); // Give the entity last created
// Add the component to your entity component's set and your component Manager.
soldier.addComponent("BasicComponent");
soldier.hasComponent("BasicComponent"); // Return true

// Remove the component to your entity component's set and your component Manager.
soldier.removeComponent("BasicComponent");
soldier.hasComponent("BasicComponent"); // Return false
```

#### Querying for entities

Systems have built in mechanisms for finding entities which have a specific set of Components (see Aspect).

### System

Systems encapsulate game logic, typically operating on a family of entities.

#### Create a system

* Extend to a specialized system class (for exemple, intervalSystem or IteratingSystem)
* Register it on your world

##### Example

Your own system : 

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

Register your system and process it :
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

## License

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
