import {describeResource, InitializedResourceClasses}from "./relayer/ResourceDescription.js";
import Resource from "./relayer/Resource.js";
import ListResource from "./relayer/ListResource.js";
import Transport from "./relayer/Transport.js";
import UrlHelper from "./relayer/UrlHelper.js";
import PrimaryResourceTransformer from "./relayer/transformers/PrimaryResourceTransformer.js";
import SingleRelationshipDescription from "./relayer/relationshipDescriptions/SingleRelationshipDescription.js";
import ResolvedEndpoint from "./relayer/endpoints/ResolvedEndpoint.js";
import {TemplatedUrlFromUrl} from "./relayer/TemplatedUrl.js";
import {AsModule, Provider} from "a1atscript";
import XingPromiseFactory from "xing-promise"
import {default as injector, instance} from "./relayer/injector.js";

@AsModule('relayer', [ ])
@Provider('relayer', ['$provide'])
export default class ResourceLayer {

  static get Resource() { return Resource; }

  static get ListResource() { return ListResource; }

  static get Describe() { return describeResource; }

  constructor($provide) {

    injector.reset();

    this.apis = {};
    this.$provide = $provide;
    this.$get = ['$injector', ($injector) => {
      var builtApis = {};
      Object.keys(this.apis).forEach((apiName) => {
        buildApis[apiName] = $injector.get(apiName);
      });
      return buildApis;
    }];
  }

  createApi(apiName, topLevelResource, baseUrl) {
    this.apis[apiName] = {
      topLevelResource, baseUrl
    };
    this.$provide.factory(apiName, [ '$http', '$q', function( $http, $q ) {

      var XingPromise = XingPromiseFactory.factory($q);
      injector.XingPromise.value = XingPromise;

      injector.instantiate(InitializedResourceClasses);

      var apiBuilder = new APIBuilder($http, topLevelResource, baseUrl);
      return apiBuilder.build();
    }
    ]);
  }
}

class APIBuilder {
  constructor($http, topLevelResource, baseUrl) {
    this.$http = $http;
    this.topLevelResource = topLevelResource;
    this.baseUrl = baseUrl;
  }

  build() {
    var {$http, topLevelResource, baseUrl} = this;

    var urlHelper = injector.instantiate(instance(UrlHelper), baseUrl);
    var wellKnownUrl = urlHelper.fullUrlRegEx.exec(baseUrl)[3];

    var transport = injector.instantiate(instance(Transport), urlHelper, $http);
    var templatedUrl = injector.instantiate(instance(TemplatedUrlFromUrl), wellKnownUrl, wellKnownUrl);
    var relationshipDescription = injector.instantiate(instance(SingleRelationshipDescription),"", topLevelResource);
    var transformer = injector.instantiate(instance(PrimaryResourceTransformer), relationshipDescription);

    var endpoint = injector.instantiate(instance(ResolvedEndpoint), transport, templatedUrl, transformer);
    topLevelResource.resourceDescription.applyToEndpoint(endpoint);
    return endpoint;
  }
}
