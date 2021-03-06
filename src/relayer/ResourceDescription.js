import APIError from "./APIError.js";
import JsonPropertyDecorator from "./decorators/JsonPropertyDecorator.js";
import RelatedResourceDecorator from "./decorators/RelatedResourceDecorator.js";
import SingleRelationshipDescription from "./relationshipDescriptions/SingleRelationshipDescription.js";
import ManyRelationshipDescription from "./relationshipDescriptions/ManyRelationshipDescription.js";
import ListRelationshipDescription from "./relationshipDescriptions/ListRelationshipDescription.js";
import MapRelationshipDescription from "./relationshipDescriptions/MapRelationshipDescription.js";
import Inflector from "xing-inflector";
import {Inject, factory} from "./injector.js";

var resourcesToInitialize = [];

export function describeResource(resourceClass, defineFn){
  resourcesToInitialize.push({resourceClass, defineFn});
}

export class InitializedResourceClasses {

  constructor(resourceDescriptionFactory) {
    this.resourceDescriptionFactory = resourceDescriptionFactory;
    this.initializeClasses();
  }

  buildDescription(resourceToInitialize) {
    var resourceClass = resourceToInitialize.resourceClass;
    var defineFn = resourceToInitialize.defineFn;
    var resourceDescription = resourceClass.description(this.resourceDescriptionFactory);
    // wrap-around definitions because...
    defineFn(resourceDescription);
  }

  applyDescription(resourceToInitialize){
    var resourceClass = resourceToInitialize.resourceClass;
    var resourceDescription = resourceClass.resourceDescription;
    var errorClass = function (responseData) {
      APIError.call(this, responseData);
    };
    errorClass.relationships = {};
    errorClass.properties = {};
    errorClass.prototype = Object.create(APIError.prototype);
    errorClass.prototype.constructor = errorClass;
    resourceDescription.applyToResource(resourceClass.prototype);
    resourceDescription.applyToError(errorClass.prototype);
    resourceClass.errorClass = errorClass;
    return resourceClass;
  }

  initializeClasses() {
    resourcesToInitialize.forEach((resourceToInitialize) => {
      this.buildDescription(resourceToInitialize);
    });

    return resourcesToInitialize.map((resourceToInitialize) => {
      this.applyDescription(resourceToInitialize);
    });
  }
}

export class ResourceDescription {

  constructor(jsonPropertyDecoratorFactory,
    relatedResourceDecoratorFactory,
    singleRelationshipDescriptionFactory,
    manyRelationshipDescriptionFactory,
    listRelationshipDescriptionFactory,
    mapRelationshipDescriptionFactory,
    inflector) {

      this.jsonPropertyDecoratorFactory = jsonPropertyDecoratorFactory;
      this.relatedResourceDecoratorFactory = relatedResourceDecoratorFactory;
      this.singleRelationshipDescriptionFactory = singleRelationshipDescriptionFactory;
      this.manyRelationshipDescriptionFactory = manyRelationshipDescriptionFactory;
      this.listRelationshipDescriptionFactory = listRelationshipDescriptionFactory;
      this.mapRelationshipDescriptionFactory = mapRelationshipDescriptionFactory;
      this.inflector = inflector;

      this.decorators = {};
      this.allDecorators = [];
      this.parentDescription = null; //automated inheritance?
  }

  chainFrom(other){
    if(this.parentDescription && this.parentDescription !== other){
      throw new Error("Attempted to rechain description: existing parent if of " +
                      `${this.parentDescription.ResourceClass}, new is of ${other.ResourceClass}`);
    } else {
      this.parentDescription = other;
    }
  }

  recordDecorator(name, decoratorDescription) {
    this.decorators[name] = this.decorators[name] || [];
    this.decorators[name].push(decoratorDescription);
    this.allDecorators.push(decoratorDescription);
    return decoratorDescription;
  }

  applyToResource(resource){
    this.allDecorators.forEach((decorator) => {
      decorator.resourceApply(resource);
    });
    if (this.parentDescription) {
      this.parentDescription.applyToResource(resource);
    }
  }

  applyToError(error){
    this.allDecorators.forEach((decorator) => {
      decorator.errorsApply(error);
    });
    if (this.parentDescription) {
      this.parentDescription.applyToError(error);
    }
  }

  applyToEndpoint(endpoint){
    this.allDecorators.forEach((decorator) => {
      decorator.endpointApply(endpoint);
    });
    if (this.parentDescription) {
      this.parentDescription.applyToEndpoint(endpoint);
    }
  }

  property(property, initial){
    this.jsonProperty(property, `$.data.${this.inflector.underscore(property)}`, initial);
  }

  hasOne(property, rezClass, initialValues){
    return this.relatedResource(property, rezClass, initialValues, this.singleRelationshipDescriptionFactory);
  }

  hasMany(property, rezClass, initialValues) {
    return this.relatedResource(property, rezClass, initialValues, this.manyRelationshipDescriptionFactory);
  }

  hasList(property, rezClass, initialValues) {
    return this.relatedResource(property, rezClass, initialValues, this.listRelationshipDescriptionFactory);
  }

  hasMap(property, rezClass, initialValue){
    return this.relatedResource(property, rezClass, initialValue, this.mapRelationshipDescriptionFactory);
  }

  jsonProperty(name, path, value, options) {
    return this.recordDecorator(name, this.jsonPropertyDecoratorFactory(name, path, value, options));
  }

  relatedResource(property, rezClass, initialValues, relationshipDescriptionFactory){
    var relationship = relationshipDescriptionFactory(property, rezClass, initialValues);
    this.recordDecorator(name, this.relatedResourceDecoratorFactory(property, relationship));
    return relationship;
  }

}

Inject(factory(ResourceDescription))(InitializedResourceClasses);

Inject(
  factory(JsonPropertyDecorator),
  factory(RelatedResourceDecorator),
  factory(SingleRelationshipDescription),
  factory(ManyRelationshipDescription),
  factory(ListRelationshipDescription),
  factory(MapRelationshipDescription),
  Inflector
)(ResourceDescription);
