import ListDecorator from "../src/relayer/ListDecorator.js"

describe("ListDecorator", function() {
  var list, resource, self, listDecorator, ItemClass, temporaryTemplateUrlFactory, uriTemplate;

  beforeEach(function() {
    list = [1, 2, 3];

    self = jasmine.createSpyObj("self", ["remove", "update", "load"]);

    resource = {
      url: "/abc",
      uriParams: {a: 3},
      uriTemplate: "a url template",
      relationships: {
        relatedObject: null
      },
      self() {
        return self;
      },
      relatedObject: jasmine.createSpy("relatedObject"),
      create: jasmine.createSpy("create").and.callFake(function (x) { return Promise.resolve(x); })
    }

    ItemClass = function() {
      this.a = "b"
    };

    uriTemplate = "a template";

    temporaryTemplateUrlFactory = function(x) {
      return x;
    }

    listDecorator = new ListDecorator(temporaryTemplateUrlFactory);
    listDecorator.decorate(list, resource, ItemClass, uriTemplate)
  });

  it("should setup url properties on the list", function() {
    expect(list.url).toEqual("/abc");
    expect(list.uriParams).toEqual({a: 3})
    expect(list.uriTemplate).toEqual("a url template");
  });

  it("should setup remove update and load", function() {
    list.remove("x");
    list.load("y");
    list.update("z");

    expect(self.remove).toHaveBeenCalledWith(list, "x");
    expect(self.load).toHaveBeenCalledWith(list, "y");
    expect(self.update).toHaveBeenCalledWith(list, "z");
  });

  it("should setup relationships", function() {
    list.relatedObject("abc")
    expect(resource.relatedObject).toHaveBeenCalledWith("abc");
  });

  describe("create", function() {
    beforeEach(function(done) {
      list.create("a value").then(() => {
        done();
      })
    })
    it("should setup create to add to the list", function() {
      expect(list).toEqual([1, 2, 3, "a value"]);
    });
  });

  it("should setup new", function() {
    var value = list.new(true);
    expect(value instanceof ItemClass).toBe(true);
    expect(value.templatedUrl).toEqual("a template");
  });
});
