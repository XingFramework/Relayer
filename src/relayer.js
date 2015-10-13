import {describeResource, InitializedResourceClasses, ResourceDescription}from "./relayer/ResourceDescription.js";
import Resource from "./relayer/Resource.js";
import * as Endpoints from "./relayer/endpoints.js";
import * as Serializers from "./relayer/serializers.js";
import * as Mappers from "./relayer/mappers.js";
import * as Transformers from "./relayer/transformers.js";
import * as Initializers from "./relayer/initializers.js";
import * as Decorators from "./relayer/decorators.js";
import * as RelationshipDescriptions from "./relayer/relationshipDescriptions.js";
import ListResource from "./relayer/ListResource.js";
import PrimaryResourceBuilder from "./relayer/PrimaryResourceBuilder.js";
import ResourceBuilder from "./relayer/ResourceBuilder.js";
import Transport from "./relayer/Transport.js";
import UrlHelper from "./relayer/UrlHelper.js";
import * as TemplatedUrls from "./relayer/TemplatedUrl.js";
import RelayerPromiseFactory from "./relayer/Promise.js";
import RelationshipUtilities from "./relayer/RelationshipUtilities.js";
import {AsModule, Provider} from "a1atscript";
import Inflector from "xing-inflector";

import * as classMap from './relayer/everything.js';

@AsModule('relayer', [
  Endpoints,
  Serializers,
  Mappers,
  Transformers,
  Initializers,
  Decorators,
  RelationshipDescriptions,
  ListResource,
  PrimaryResourceBuilder,
  ResourceBuilder,
  Transport,
  UrlHelper,
  TemplatedUrls,
  ResourceDescription,
  InitializedResourceClasses,
  ResourceBuilder,
  PrimaryResourceBuilder,
  Inflector,
  RelayerPromiseFactory,
  RelationshipUtilities
])
@Provider('relayer', ['$provide'])
export default class ResourceLayer {

  static get Resource() { return Resource; }

  static get ListResource() { return ListResource; }

  static get Describe() { return describeResource; }

  constructor($provide) {
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
    this.$provide.factory(apiName, [ '$http', function( $http) {
      var {
        UrlHelper, Transport, TemplatedUrlFromUrl,
        PrimaryResourceTransformer, SingleRelationshipDescription,
        ResolvedEndpoint
      } = classMap;

      var orchestrator = new TopLevelOrchestrator(classMap, $http, topLevelResource);
      return orchestrator.arrange();
    }
    ]);
  }
}

import Constructable from './relayer/Constructable.js';
class TopLevelOrchestrator extends Constructable {
  constructor(classMap, $http, topLevelResource, baseUrl) {
    super(classMap);
    this.$http = $http;
    this.topLevelResource = topLevelResource;
    this.baseUrl = baseUrl;
  }

  arrange() {
    var {$http, topLevelResource, baseUrl} = this;

    var urlHelper = this.construct("UrlHelper", baseUrl);
    var wellKnownUrl = urlHelper.fullUrlRegEx.exec(baseUrl)[3];

    var transport = this.construct("Transport", urlHelper, $http);
    var templatedUrl = this.construct("TemplatedUrlFromUrl", wellKnownUrl, wellKnownUrl);
    var transformer = this.construct("PrimaryResourceTransformer",
                                this.construct("SingleRelationshipDescription", "",
                                          topLevelResource));

    var endpoint = this.construct("ResolvedEndpoint", transport, templatedUrl, transformer);
    topLevelResource.resourceDescription.applyToEndpoint(endpoint);
    return endpoint;
  }
}
