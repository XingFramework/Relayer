import {describeResource, InitializedResourceClasses, ResourceDescription}from "./relayer/ResourceDescription.js";
import Resource from "./relayer/Resource.js";
import ListResource from "./relayer/ListResource.js";
import PrimaryResourceBuilder from "./relayer/PrimaryResourceBuilder.js";
import ResourceBuilder from "./relayer/ResourceBuilder.js";
import Transport from "./relayer/Transport.js";
import UrlHelper from "./relayer/UrlHelper.js";
import * as TemplatedUrls from "./relayer/TemplatedUrl.js";
import XingPromise from "xing-promise";
import RelationshipUtilities from "./relayer/RelationshipUtilities.js";
import {AsModule, Provider} from "a1atscript";
import Inflector from "xing-inflector";

@AsModule('relayer', [ ])
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
    this.$provide.factory(apiName, [ '$http', '$q', function( $http, $q ) {
      var {
        UrlHelper, Transport, TemplatedUrlFromUrl,
        PrimaryResourceTransformer, SingleRelationshipDescription,
        ResolvedEndpoint
      } = classMap;
      classMap.setXingPromise(classMap.XingPromiseFactory.factory($q));

      InitializedResourceClasses.new(classMap);

      var orchestrator = TopLevelOrchestrator.new(classMap, $http, topLevelResource, baseUrl);
      return orchestrator.arrange();
    }
    ]);
  }
}

// This is the first class built after the introduction of the Constructable top class.
// Using construct instead of factoryNames is a goal state, but tests require
// changing to make that happen
import Constructable from './relayer/Constructable.js';
class TopLevelOrchestrator extends Constructable {
  constructor($http, topLevelResource, baseUrl) {
    super();
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
