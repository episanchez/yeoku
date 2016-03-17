require('app-module-path').addPath(__dirname + '/lib');

module.exports = {
    World    : require('world'),
    WorldBuilder : require('worldBuilder'),
    WorldConfiguration : require('worldConfiguration'),
    Entity : require('entity'),
 	Aspect : require('aspect/aspect'),
 	EntitySubscription : require('aspect/entitySubscription'),
 	Component : require('component/component'),
 	ComponentType : require('./lib/component/componentType'),
 	Manager : require('manager/manager'),
    BaseSystem    : require('system/baseSystem'),
    IntervalSystem : require('system/intervalSystem'),
    IteratingSystem : require('system/iteratingSystem')
};