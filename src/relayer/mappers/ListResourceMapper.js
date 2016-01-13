import ResourceMapper from "./ResourceMapper.js";
import {TemplatedUrlFromUrl} from "../TemplatedUrl.js";
import ListDecorator from "../ListDecorator.js";
import ResourceBuilder from "../ResourceBuilder.js";
import PrimaryResourceBuilder from "../PrimaryResourceBuilder.js";
import PrimaryResourceTransformer from "../transformers/PrimaryResourceTransformer.js";
import ManyResourceMapper from "./ManyResourceMapper.js";
import {Inject, factory, singleton} from "../injector.js";

export default class ListResourceMapper extends ResourceMapper {

  constructor(
      templatedUrlFromUrlFactory,
      resourceBuilderFactory,
      primaryResourceBuilderFactory,
      primaryResourceTransformerFactory,
      manyResourceMapperFactory,
      listDecorator,
      transport,
      response,
      relationshipDescription,
      endpoint,
      useErrors = false) {

    super(templatedUrlFromUrlFactory,
      resourceBuilderFactory,
      primaryResourceBuilderFactory,
      primaryResourceTransformerFactory,
      transport,
      response,
      relationshipDescription,
      endpoint,
      useErrors);
    this.listDecorator = listDecorator;
    this.manyResourceMapperFactory = manyResourceMapperFactory;
  }

  get ResourceClass() {
    return this.relationshipDescription.ListResourceClass;
  }

  get ItemResourceClass() {
    return this.relationshipDescription.ResourceClass;
  }

  mapNestedRelationships() {

    // add mappings for list resource
    super.mapNestedRelationships();

    this.resource = this.mapped;
    var manyResourceMapper = this.manyResourceMapperFactory(this.transport, this.resource.pathGet("$.data"), this.relationshipDescription);
    var uriTemplate = this.resource.pathGet("$.links.template");
    manyResourceMapper.uriTemplate = uriTemplate;
    this.mapped = manyResourceMapper.map();
    this.listDecorator.decorate(this.mapped, this.resource, this.ItemResourceClass, uriTemplate);
  }
}

Inject(
  factory(TemplatedUrlFromUrl),
  factory(ResourceBuilder),
  factory(PrimaryResourceBuilder),
  factory(PrimaryResourceTransformer),
  factory(ManyResourceMapper),
  singleton(ListDecorator)
)(ListResourceMapper);
