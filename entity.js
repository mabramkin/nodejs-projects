var inherits = require('util').inherits;

//---------------------- Entity class
function Entity(_entityType) {
    this.entityType = _entityType;      
}

Entity.prototype.getEntityType = function () { 
  return this.entityType;
}

//---------------------- Sprint class
function Sprint() {
  Entity.call(this, "Sprint");
  this.dateStart = null;
  this.dateEnd = null;
  this.dateCodeFreeze = null;
}

Sprint.prototype.getDateStart = function() {
  return this.dateStart;
}
Sprint.prototype.getDateEnd = function() {
  return this.dateEnd;
}
Sprint.prototype.getDateCodeFreeze = function() {
  return this.dateCodeFreeze;
}


inherits(Sprint, Entity);

//---------------------- Task class
function Task(_name) {  
  Entity.call(this, "Task");
  this.name = _name;
}

Task.prototype.getName = function() {
  return this.name;
}

inherits(Task, Entity);

module.exports = { Entity, Sprint, Task };