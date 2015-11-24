import ResourceMapper from "./ResourceMapper.js";
import {TemplatedUrlFromUrl} from "../TemplatedUrl.js";
import TemporaryTemplatedUrl from "../TemporaryTemplatedUrl.js";
import ResourceBuilder from "../ResourceBuilder.js";
import PrimaryResourceBuilder from "../PrimaryResourceBuilder.js";
import PrimaryResourceTransformer from "../transformers/PrimaryResourceTransformer.js";
import ManyResourceMapper from "./ManyResourceMapper.js";
import {Inject, factory} from "../injector.js";

export default class ListResourceMapper extends ResourceMapper {

  constructor(
      templatedUrlFromUrlFactory,
      resourceBuilderFactory,
      primaryResourceBuilderFactory,
      primaryResourceTransformerFactory,
      manyResourceMapperFactory,
      temporaryTemplatedUrlFactory,
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
    this.temporaryTemplatedUrlFactory = temporaryTemplatedUrlFactory;
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
    this.mapped.resource = this.resource;
    ["url", "uriTemplate", "uriParams"].forEach((func) => {
      this.mapped[func] = function(...args) {
        return this.resource[func](...args);
      };
    });
    var mapped = this.mapped;
    ["remove", "update", "load"].forEach((func) => {
      this.mapped[func] = function(...args) {
        return this.resource.self()[func](mapped,...args);
      };
    });
    Object.keys(this.resource.relationships).forEach((key) => {
      this.mapped[key] = function(...args) {
        return this.resource[key](...args);
      }
    });

    this.mapped.create = function(...args) {
      return this.resource.create(...args).then((created) => {
        this.push(created);
        return created;
      });
    }
    var ItemResourceClass = this.ItemResourceClass;
    var temporaryTemplatedUrlFactory = this.temporaryTemplatedUrlFactory;
    this.mapped.new = function(withUrl = false) {
      var item = new ItemResourceClass();
      if (withUrl) {
        item.templatedUrl = temporaryTemplatedUrlFactory(uriTemplate);
      }
      return item;
    }
  }
}

Inject(
  factory(TemplatedUrlFromUrl),
  factory(ResourceBuilder),
  factory(PrimaryResourceBuilder),
  factory(PrimaryResourceTransformer),
  factory(ManyResourceMapper),
  factory(TemporaryTemplatedUrl)
)(ListResourceMapper);
