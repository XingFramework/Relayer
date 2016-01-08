import RL from "../../src/relayer.js";
import {Module, Injector, Config} from "a1atscript";
import XingPromiseFactory from "xing-promise";
import Page from "../support/Page.js";

class Resources extends RL.Resource {
}

RL.Describe(Resources, (desc) => {
  var pages = desc.hasList("pages",
    Page,
    [])
  pages.linkTemplate = "page";
  pages.canCreate = true;
});

// this is horrible -- no easy way to get Babel and Traceur to compile the same config block
class AppConfig {
  @Config("relayerProvider")
  setupResources(relayerProvider) {
    relayerProvider.createApi("resources", Resources, "http://www.example.com/resources")
  }
}

var AppModule = new Module("AppModule", [RL, AppConfig.prototype]);

describe("Page test", function() {

  var mockHttp, resources, $rootScope;

  beforeEach(function() {
    function pageData() {
      return {
        // links: {},
        data: {
          title: "Title 1",
          keywords: "keyword1 keyword2",
          description: "Description 1",
          layout:  "one_column",
          contents: {
            main: {
              links: { self: "/content-blocks/:id"  },
              data: {
                content_type: 'text/html',
                body: 'Four score and <em>seven</em> years'
              }
            },
            headline: {
              links: { self: "/content-blocks/:id" },
              data: {
                content_type: 'text/html',
                body: 'The Gettysburg Address'
              }
            },
            styles: {
              links: { self: "/content-blocks/:id" },
              data: {
                content_type: 'text/css',
                body: 'p { font-weight: bold; }'
              }
            }
          }
        },
        links: {
          self: "/pages/awesome"
        }
      };
    }

    function resourcesData() {
      return {
        data: {},
        links: {
          pages: "/pages",
          page: "/pages/{url_slug}"
        }
      }
    }

    mockHttp = function(Promise, params) {
      if (params.method == "GET" && params.url == "http://www.example.com/resources") {
        return Promise.resolve({
          status: 200,
          headers() {
            return {
              ETag: "1348"
            }
          },
          data: resourcesData()
        });
      } else if (params.method == "GET" && params.url == "http://www.example.com/pages/awesome") {
        return Promise.resolve({
          status: 200,
          headers() {
            return {
              ETag: "4567"
            }
          },
          data: pageData()
        });
      } else if (params.method == "GET"){
        return Promise.reject({
          data: "404 not found"
        });
      } else if (params.method == "POST") {
        return Promise.resolve({
          config: {
            url: "http://www.example.com/pages"
          },
          status: 201,
          headers() {
            return {
              location: "http://www.example.com/pages/awesome"
            }
          }
        });
      } else if (params.method == "PUT") {
        if (params.url == "http://www.example.com/pages/awesome") {
          return Promise.resolve({
            status: 200,
            headers() {
              return {
                ETag: "3423"
              }
            },
            data: pageData()
          });
        } else {
          return Promise.reject({
            data: "404 not found"
          });
        }
      } else if (params.method == "DELETE") {
        return Promise.resolve({});
      }
    };
    var injector = new Injector();
    injector.instantiate(AppModule);
    angular.mock.module('AppModule');
    angular.mock.module(function($provide) {
      $provide.factory("$http", function($q) {
        var XingPromise = XingPromiseFactory.factory($q);
        return function(params) {
          return mockHttp(XingPromise, params);
        };
      });
    });
    inject(function(_resources_, _$rootScope_) {
      resources = _resources_;
      $rootScope = _$rootScope_;
    });
  })

  describe('created in the client', function() {
    var page;

    beforeEach(function() {
      page = resources.pages().new();

    });

    it('should have defined values on all getters', function() {
      expect(page.layout).not.toEqual(undefined);
      expect(page.layout).not.toEqual(false);

      expect(page.title).not.toEqual(undefined);
      expect(page.title).not.toEqual(false);

      expect(page.keywords).not.toEqual(undefined);
      expect(page.keywords).not.toEqual(false);

      expect(page.description).not.toEqual(undefined);
      expect(page.description).not.toEqual(false);

      expect(page.styles).not.toEqual(undefined);
      expect(page.styles).not.toEqual(false);

      expect(page.headline).not.toEqual(undefined);
      expect(page.headline).not.toEqual(false);

      expect(page.publishStart).not.toEqual(undefined);
      expect(page.publishStart).not.toEqual(false);

      expect(page.publishEnd).not.toEqual(undefined);
      expect(page.publishEnd).not.toEqual(false);

      expect(page.urlSlug).not.toEqual(undefined);
      expect(page.urlSlug).not.toEqual(false);

      expect(page.metadata).not.toEqual(undefined);
      expect(page.metadata).not.toEqual(false);
    });

    it('set up contents correctly', function() {
      var block;
      page.layout = "two_column";
      page.setupContents();

      block = page.contents("headline");
      block.body = "test";
      expect(block.body).toEqual("test");

      block = page.contents("styles");
      block.body = "test";
      expect(block.body).toEqual("test");

      block = page.contents("columnOne");
      block.body = "test";
      expect(block.body).toEqual("test");

      block = page.contents("columnTwo");
      block.body = "test";
      expect(block.body).toEqual("test");
    });
  });


  describe('with a live result', function() {

    var page;

    beforeEach(function(done) {
      page = resources.pages().new();
      resources.pages().create(page).then((createdPage) => {
        page = createdPage;
        done();
      });
      $rootScope.$apply();
    });

    it('should have a title', function() {
      expect(page.title).toEqual('Title 1');
    });

    it('should have a title', function() {
      expect(page.layout).toEqual('one_column');
    });

    it('should have keywords', function() {
      expect(page.keywords).toEqual('keyword1 keyword2');
    });

    it('should have a description', function() {
      expect(page.description).toEqual('Description 1');
    });

    it('should have styles', function(){
      expect(page.styles).toEqual('p { font-weight: bold; }');
    });

    it('should have headline', function(){
      expect(page.headline).toEqual('The Gettysburg Address');
    });

    it('should have mainContent', function() {
      expect(page.mainContent).toEqual('Four score and <em>seven</em> years');
    });

    it('should wrap metadata', function(){
      expect(page.metadata).toEqual(jasmine.any(Object));
    });

    it('should include appropriate values in metadata object', function(){
      expect(page.metadata.pageTitle).toEqual('Title 1');
      expect(page.metadata.pageKeywords).toEqual('keyword1 keyword2');
      expect(page.metadata.pageDescription).toEqual('Description 1');
      expect(page.metadata.pageStyles).toEqual('p { font-weight: bold; }');
    });

    it("should resolve shortlink", function() {
      expect(page.shortLink).toEqual("awesome")
    })
  });
});
