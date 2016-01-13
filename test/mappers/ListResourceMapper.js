import ListResourceMapper from "../../src/relayer/mappers/ListResourceMapper.js"

describe("ListResourceMapper", function() {
  var listResourceFactory,
  manyResourceMapper,
  manyResourceMapperFactory,
  manyResourceMapSpy,
  data,
  uriTemplate,
  ListResource,
  ItemResourceClass,
  listResourceMapper,
  templatedUrlFromUrlFactory,
  listDecorator,
  templatedUrl,
  templatedUrlDataPathSpy,
  resourceBuilderFactory,
  primaryResourceBuilderFactory,
  results,
  transport,
  listResourceMapperFactory,
  listResourceSerializerFactory,
  primaryResourceTransformer,
  primaryResourceTransformerFactory,
  relationship
  ;

  beforeEach(function() {
    manyResourceMapper = {
      map() {
        return this.data.map((elem) => {
          return {
            response: elem
          };
        });
      }
    };

    manyResourceMapSpy = spyOn(manyResourceMapper, "map").and.callThrough();

    manyResourceMapperFactory = jasmine.createSpy("manyResourceMapperFactory ").and.callFake(
      function(thisTransport, thisData, thisRelationshipDescription) {
        manyResourceMapper.data = thisData;
        return manyResourceMapper;
      });

    data = new Array(10);
    data.fill({
      data: {
      },
      links: {

      }
    }, 0, 10);

    ListResource = function(thisData) {
      this.data = thisData;
      this.pathGet = function(path) {
        if (path == "$.data") {
          return this.data;
        } else if (path == "$.links.template") {
          return "/cheese/{cheese}";
        } else if (path == "$.links.crackers") {
          return "/crackers/crackers"
        }
      };
    };

    ListResource.relationships = {};

    ListResource.relationships["crackers"] = {
      dataPath: "$.data.crackers",
      linksPath: "$.links.crackers"
    }

    ItemResourceClass = function() {
      this.awesome = "awesome";
    };

    templatedUrl = {
      addDataPathLink(path) {
      }
    };

    templatedUrlDataPathSpy = spyOn(templatedUrl, "addDataPathLink").and.callThrough();

    templatedUrlFromUrlFactory = jasmine.createSpy("templatedUrlFromUrlFactory").and.returnValue(templatedUrl);

    primaryResourceTransformer = {
      properties: "dummy"
    };

    primaryResourceTransformerFactory = jasmine.createSpy("primaryResourceTransformerFactory").and.returnValue(primaryResourceTransformer);

    resourceBuilderFactory = jasmine.createSpy("resourceBuilderFactory").and.callFake(function(thisTransport, thisResponse, thisPrimaryResourceTransformer, ThisResourceClass) {
      return {
        build() {
          var thisResource = new ThisResourceClass(thisResponse);
          return thisResource;
        }
      }
    });

    primaryResourceBuilderFactory = jasmine.createSpy("primaryResourceBuilderFactory").and.callFake(function(thisResponse, ThisResourceClass) {
      return {
        build() {
          var thisResource = new ThisResourceClass(thisResponse);
          return thisResource;
        }
      }
    });

    listDecorator = {
      decorate: jasmine.createSpy("decorate")
    }

    transport = {};

    listResourceMapperFactory = function() {
      return "hello";
    }

    listResourceSerializerFactory = function() {
      return "goodbye";
    }

    relationship = {
      ListResourceClass: ListResource,
      ResourceClass: ItemResourceClass,
      mapperFactory: listResourceMapperFactory,
      serializerFactory: listResourceSerializerFactory,
      canCreate: true
    }
    listResourceMapper = new ListResourceMapper(
      templatedUrlFromUrlFactory,
      resourceBuilderFactory,
      primaryResourceBuilderFactory,
      primaryResourceTransformerFactory,
      manyResourceMapperFactory,
      listDecorator,
      transport,
      data,
      relationship);
  });

  describe("it should transform responses into a list", function() {
    beforeEach(function() {
      results = listResourceMapper.map();
    });

    it("should setup the many mapper with the ItemResourceClass", function() {
      expect(manyResourceMapperFactory).toHaveBeenCalledWith(transport, data, relationship);
    });

    it("should build the list with the resource builder", function() {
      expect(manyResourceMapSpy).toHaveBeenCalled();
    });

    it("should return the right list", function() {
      var resultArray = data.map((elem) => {
        return {
          response: elem
        }
      });
      var resultElements = Array.from(results);
      expect(resultElements).toEqual(resultArray);
    });

    it("should decorate the list", function() {
      expect(listDecorator.decorate).toHaveBeenCalledWith(results, jasmine.any(ListResource), ItemResourceClass, "/cheese/{cheese}")
    });

    it("should setup the primary resource transformer", function() {
      expect(primaryResourceTransformerFactory).toHaveBeenCalledWith(relationship)
    });

    it("should build the resource with the regular resource builder", function() {
      expect(resourceBuilderFactory).toHaveBeenCalledWith(
        transport,
        data,
        primaryResourceTransformer,
        ListResource,
        relationship);
    });
  });
});
