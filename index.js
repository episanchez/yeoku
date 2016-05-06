global.libRequire = function(name){
    return require(__dirname + '/lib/' + name);
}

module.exports = {
    World    : libRequire('world'),
    WorldBuilder : libRequire('worldBuilder'),
    WorldConfiguration : libRequire('worldConfiguration'),
    ComponentBuilder : libRequire('component/componentBuilder'),
    Entity : libRequire('entity/entity'),
    ArchetypeBuilder : libRequire('entity/archetypeBuilder'),
 	Aspect : libRequire('aspect/aspect'),
 	EntitySubscription : libRequire('aspect/entitySubscription'),
 	Manager : libRequire('manager/manager'),
    BaseSystem : libRequire('system/baseSystem'),
    EntitySystem : libRequire('system/entitySystem'),
    IntervalSystem : libRequire('system/intervalSystem'),
    IteratingSystem : libRequire('system/iteratingSystem'),
    IntervalIteratingSystem : libRequire('system/intervalIteratingSystem')
};