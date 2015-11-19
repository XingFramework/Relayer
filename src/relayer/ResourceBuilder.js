import {TemplatedUrlFromUrl} from "./TemplatedUrl.js";
import ResolvedEndpoint from "./endpoints/ResolvedEndpoint.js";
import ThrowErrorTransformer from "./transformers/ThrowErrorTransformer.js";
import CreateResourceTransformer from "./transformers/CreateResourceTransformer.js";
import {Inject, factory} from "./injector.js";

export default class ResourceBuilder extends Constructable {

  constructor(templatedUrlFromUrlFactory,
    resolvedEndpointFactory,
    throwErrorTransformerFactory,
    createResourceTransformerFactory,
    transport,
    response,
    primaryResourceTransformer,
    ResourceClass,
    relationshipDescription) {
      super();

      this.transport = transport;
      this.ResourceClass = ResourceClass;
      this.relationshipDescription = relationshipDescription;

      this.templatedUrlFromUrlFactory = templatedUrlFromUrlFactory;
      this.resolvedEndpointFactory = resolvedEndpointFactory;
      this.throwErrorTransformerFactory = throwErrorTransformerFactory;
      this.createResourceTransformerFactory = createResourceTransformerFactory;
      this.response = response;
      this.primaryResourceTransformer = primaryResourceTransformer;

  }

  build(uriTemplate = null) {
    var resource = new this.ResourceClass(this.response);
    if (resource.pathGet("$.links.self")) {
      if (uriTemplate) {
        resource.templatedUrl = this.templatedUrlFromUrlFactory(uriTemplate, resource.pathGet("$.links.self"));
      } else {
        resource.templatedUrl = this.templatedUrlFromUrlFactory(resource.pathGet("$.links.self"), resource.pathGet("$.links.self"));
      }
      resource.templatedUrl.addDataPathLink(resource, "$.links.self");
      if (this.relationshipDescription.canCreate) {
        var createUriTemplate = uriTemplate || resource.pathGet("$.links.template");
        var createResourceTransformer = this.createResourceTransformerFactory(this.relationshipDescription.createRelationshipDescription, createUriTemplate);
      } else {
        var createResourceTransformer = this.throwErrorTransformerFactory();
      }
      var endpoint = this.resolvedEndpointFactory(this.transport, resource.templatedUrl, this.primaryResourceTransformer, createResourceTransformer);
      resource.self = function() { return endpoint; }
    }
    return resource;
  }
}

Inject(
  factory(TemplatedUrlFromUrl),
  factory(ResolvedEndpoint),
  factory(ThrowErrorTransformer),
  factory(CreateResourceTransformer)
)(ResourceBuilder);
