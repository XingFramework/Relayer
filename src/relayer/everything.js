export {default as Resource} from "./Resource.js";
export * from "./endpoints.js";
export * from "./serializers.js";
export * from "./mappers.js";
export * from "./transformers.js";
export * from "./initializers.js";
export * from "./decorators.js";
export * from "./relationshipDescriptions.js";
export {default as ListResource} from "./ListResource.js";
export {default as PrimaryResourceBuilder} from "./PrimaryResourceBuilder.js";
export {default as ResourceBuilder} from "./ResourceBuilder.js";
export {ResourceDescription} from './ResourceDescription.js';
export {default as Transport} from "./Transport.js";
export {default as UrlHelper} from "./UrlHelper.js";
export * from "./TemplatedUrl.js";
export {default as XingPromiseFactory} from "xing-promise";
export {default as RelationshipUtilities} from "./RelationshipUtilities.js";
export {default as Inflector} from "xing-inflector";
export var singletons = {};
export var XingPromise;

// XXX This is a nasty but momentarily necessary hack
export function setXingPromise(xp){
  XingPromise = xp;
}
