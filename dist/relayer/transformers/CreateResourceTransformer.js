import PrimaryResourceTransformer from "./PrimaryResourceTransformer.js"
import {SimpleFactory} from "../SimpleFactoryInjector.js"

@SimpleFactory('CreateResourceTransformerFactory', [])
export default class CreateResourceTransformer extends PrimaryResourceTransformer {

  constructor(relationshipDescription, uriTemplate) {
    super(relationshipDescription);
    this.uriTemplate = uriTemplate;
  }

  transformResponse(endpoint, response) {
    return response.then(
      (resolvedResponse) => {
        var resourceMapper = this.primaryResourceMapperFactory(endpoint.transport, resolvedResponse.data, this.relationshipDescription);
        resourceMapper.uriTemplate = this.uriTemplate;
        var resource = resourceMapper.map();
        resource.templatedUrl.etag = resolvedResponse.etag;
        return resource;
      }
    ).catch(
      (resolvedError) => {
        throw this.primaryResourceMapperFactory(endpoint.transport, resolvedError.data, this.relationshipDescription, null, true).map();
      }
    );
  }
}
