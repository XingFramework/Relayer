import RL from "../../src/relayer.js";
import {Module, Injector, Config} from "a1atscript";
import XingPromiseFactory from "xing-promise";
import Page from "../support/Page.js";

export class MenuItem extends RL.Resource {
  static get typeOptions() {
    return [
      { name: "External URL", type: "raw_url" },
      { name: "Content Page", type: "page" },
    ];
  }

  static get types() {
    return MenuItem.typeOptions.map((option) => option.type)
  }

  external(){
    return this.type == "raw_url";
  }

  internal(){
    return this.type == "page";
  }

  get target(){
    return this.internal() ? this.internalTarget : this.externalTarget;
  }

  set target(value){
    if (this.internal()){
      this.internalTarget = value;
      return this.internalTarget;
    } else {
      this.externalTarget = value;
      return this.externalTarget
    }
  }

  hasChildren() {
    return this.children().length > 0;
  }

  get typeOptions(){
    return MenuItem.typeOptions;
  }

  get pageTarget() {
    return this.page().shortLink;
  }

}

RL.Describe(MenuItem, (desc) => {
  var children = desc.hasMany("children", MenuItem, []);
  children.async = false;
  desc.jsonProperty("internalTarget", '$.data.page.links.self');
  desc.jsonProperty("externalTarget", "$.data.path", "");
  desc.property("type", "raw_url");
  desc.property("name", "");
  desc.hasOne("page", Page)
});

class Resources extends RL.Resource {
}

RL.Describe(Resources, (desc) => {
  var menus = desc.hasList("menuItems",
    MenuItem,
    [])
  menus.linkTemplate = "menuItem";
  menus.canCreate = true;
});

// this is horrible -- no easy way to get Babel and Traceur to compile the same config block
class AppConfig {
  @Config("relayerProvider")
  setupResources(relayerProvider) {
    relayerProvider.createApi("resources", Resources, "http://www.example.com/resources")
  }
}

var AppModule = new Module("AppModule", [RL, AppConfig.prototype]);

describe('MenuItem class', function(){
  var mockHttp, resources, $rootScope;

  beforeEach(function() {
    function responseData() {
      return {
        links: {},
        data: [ {
          links: {},
          data: {
            name: 'Test 1',
            type: 'page',
            page: { links: { self: '/pages/test-1',
              self_template: '/pages/{url_slug}'} },
            children: [ {
              links: {},
              data: {
                name: 'Sublevel 1',
                type: 'page',
                page: { links: { self: '/pages/test-2',
              self_template: '/pages/{url_slug}'} },
                children: [
                  {
                  links: {},
                  data: {
                    name: 'Sub-Sublevel 1',
                    type: 'page',
                    page: { links: { self: '/pages/test-3',
              self_template: '/pages/{url_slug}'} },
                    children: [ ]
                  }
                } ]
              }
            },
            {
              links: {},
              data: {
                name: 'Sublevel 2',
                type: 'page',
                page: { links: { self: '/pages/test-2.1',
              self_template: '/pages/{url_slug}'} },
              }
            } ]
          }
        },
        {
          links: {},
          data: {
            name: 'Test 2',
            type: 'page',
            page: { links: { self: '/pages/test-4',
              self_template: '/pages/{url_slug}'} },
            children: [ ]
          }
        } ]
      };
    }

    function resourcesData() {
      return {
        data: {},
        links: {
          menu_items: "/menu_items",
          menu_item: "/menu_items/{id}"
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
      } else if (params.method == "GET" && params.url == "http://www.example.com/menu_items") {
        return Promise.resolve({
          status: 200,
          headers() {
            return {
              ETag: "4567"
            }
          },
          data: responseData()
        });
      } else if (params.method == "GET"){
        return Promise.reject({
          data: "404 not found"
        });
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

  describe('created by front end', function() {
    var menuItem;

    beforeEach(function() {
      menuItem = resources.menuItems().new();
    });

    it('should have defined values on all getters', function() {
      expect(menuItem.type).not.toEqual(undefined);
      expect(menuItem.type).not.toEqual(false);

      expect(menuItem.target).not.toEqual(undefined);
      expect(menuItem.target).not.toEqual(false);

      expect(menuItem.name).not.toEqual(undefined);
      expect(menuItem.name).not.toEqual(false);
    });
  });

  describe("loaded from backend", function() {
    var menu;
    beforeEach(function(done) {
      resources.menuItems().load().then((returnedMenu) => {
        menu = returnedMenu;
        done();
      });
      $rootScope.$apply();
    });


    it('have items', function() {
      expect(menu.length).toBeGreaterThan(0);
    });

    it('should have a target', function() {
      expect(menu[0].target).toEqual('/pages/test-1');
    });

    it("should have a page short linkt arget", function() {
      expect(menu[0].pageTarget).toEqual("test-1");
    });

    it('should have a name', function() {
      expect(menu[0].name).toEqual('Test 1');
    });

    it('should report external/internal', function() {
      expect(menu[0].internal()).toBeTruthy();
      expect(menu[0].external()).toBeFalsy();
    });

    it('should report hasChildren', function() {
      expect(menu[0].hasChildren()).toBeTruthy();
    });

    it('should have children', function() {
      expect(menu[0].children()[0] instanceof MenuItem).toBeTruthy();
    });

    it('should have grandchildren', function() {
      expect(menu[0].children()[0].children()[0] instanceof MenuItem).toBeTruthy();
    });

    it('report no children correctly', function() {
      expect(menu[1].hasChildren()).toBeFalsy();
    });
  });

});
