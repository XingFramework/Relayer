import TemporaryTemplatedUrl from "./TemporaryTemplatedUrl.js";
import {Inject, factory} from "./injector.js";

export default class ListDecorator {
  constructor(temporaryTemplatedUrlFactory) {
    this.temporaryTemplatedUrlFactory = temporaryTemplatedUrlFactory;
  }

  setupGetters(list, resource) {
    ["url", "uriTemplate", "uriParams"].forEach((func) => {
      Object.defineProperty(list,
        func,
        {
          get: function() {
            return resource[func];
          }
      })
    });
  }

  setupSelfFunctions(list, resource) {
    ["remove", "update", "load"].forEach((func) => {
      list[func] = function(...args) {
        if (resource.isPersisted) {
          return resource.self()[func](list,...args);
        }
      };
    });
  }

  setupRelationships(list, resource) {
    Object.keys(resource.relationships).forEach((key) => {
      list[key] = function(...args) {
        return resource[key](...args);
      }
    });
  }

  setupCreate(list, resource) {
    list.create = function(...args) {
      return resource.create(...args).then((created) => {
        list.push(created);
        return created;
      });
    }
  }

  setupNew(list, resource, ItemResourceClass, uriTemplate) {
    var temporaryTemplatedUrlFactory = this.temporaryTemplatedUrlFactory;
    if (ItemResourceClass) {
      list.new = function(withUrl = false) {
        var item = new ItemResourceClass();
        if (withUrl && uriTemplate) {
          item.templatedUrl = temporaryTemplatedUrlFactory(uriTemplate);
        }
        return item;
      }
    }
  }

  decorate(list, resource, ItemResourceClass, uriTemplate = null) {
    list.resource = resource;
    this.setupGetters(list, resource);
    this.setupSelfFunctions(list, resource);
    this.setupRelationships(list, resource);
    this.setupCreate(list, resource);
    this.setupNew(list, resource, ItemResourceClass, uriTemplate);
  }
}

Inject(
  factory(TemporaryTemplatedUrl)
)(ListDecorator);
