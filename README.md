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
// testComponent.js
var BaseComponent = require('yeoku').Component;
var ComponentType = require('yeoku').ComponentType;
var util = require('util');

var TestComponent = function(){
	BaseComponent.call(new ComponentType(0, 'testComponent', this)); // params {id, name, copy of the component}	

	this.intData = 0;
	this.rawData = null;
};

util.inherits(TestComponent, BaseComponent);

TestComponent.prototype.getIntData = function(){
	return this.intData;
};

TestComponent.prototype.getRawData = function(){
	return this.rawData;
};

TestComponent.prototype.setIntData = function(intValue){
	this.intData = inValue;	
};

TestComponent.prototype.setRawData = function(rawValue){
	this.rawData = rawValue;
};

module.exports = TestComponents;
```

#### Add/delete Component Class

You have to use the ComponentManager, this one has a array of your Component Classes and a double array of the componentType by entities.

```javascript
var TestComponent = require('./testComponent');

world.getComponentManager().create("testComponent", TestComponent); // params {name, Component Class}
world.getComponentManager().getComponentTypeByName("testComponent"); // give the component type

world.getComponentManager().removeComponentType("testComponent");
world.getComponentManager().getComponentTypeByName("testComponent"); // undefined
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
var TestComponent = require('./testComponent');

var testWorld = new World();

// you need to add your Components before your systems
testWorld.getComponentManager().addComponent("TestComponent", TestComponent);

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


## Todo

- Entity Archetype
- Implement should sync entity system and delayed systems
