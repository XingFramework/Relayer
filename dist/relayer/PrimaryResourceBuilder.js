import Constructable from './Constructable.js';

export default class PrimaryResourceBuilder extends Constructable {
  constructor(response, ResourceClass) {
    super();
    this.response = response;
    this.ResourceClass = ResourceClass;
  }

  build(endpoint) {
    var resource = new this.ResourceClass(this.response);
    resource.templatedUrl = endpoint.templatedUrl;
    resource.templatedUrl.addDataPathLink(resource, "$.links.self");
    resource.self = function() {
      return endpoint;
    };

    return resource;
  }
}
