import PrimaryResourceTransformer from "./PrimaryResourceTransformer.js"

export default class CreateResourceTransformer extends PrimaryResourceTransformer {

  transformResponse(endpoint, response) {
    return response.then(
      (resolvedResponse) => {
        var resource = this.primaryResourceMapperFactory(endpoint.transport, resolvedResponse.data, this.relationshipDescription).map();
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
