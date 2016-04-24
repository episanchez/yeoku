require('app-module-path').addPath(__dirname + '/lib');

module.exports = {
    World    : require('world'),
    WorldBuilder : require('worldBuilder'),
    WorldConfiguration : require('worldConfiguration'),
    Entity : require('entity/entity'),
 	Aspect : require('aspect/aspect'),
 	EntitySubscription : require('aspect/entitySubscription'),
 	Manager : require('manager/manager'),
    BaseSystem    : require('system/baseSystem'),
    IntervalSystem : require('system/intervalSystem'),
    IteratingSystem : require('system/iteratingSystem')
};