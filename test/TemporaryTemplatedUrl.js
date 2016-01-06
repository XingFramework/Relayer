import TemporaryTemplatedUrl from "../src/relayer/TemporaryTemplatedUrl.js"

describe("TemporaryTemplatedUrl", function() {
  var uriTemplate, templatedUrl1, templatedUrl2;

  beforeEach(function() {
    uriTemplate = "/books/{abc}/test/{def}";
    templatedUrl1 = new TemporaryTemplatedUrl(uriTemplate);
    templatedUrl2 = new TemporaryTemplatedUrl(uriTemplate);
  });

  it("should create two temporary templated urls that match the template", function() {
    expect(templatedUrl1.url).toMatch(/\/books\/.*\/test\/.*/);
    expect(templatedUrl2.url).toMatch(/\/books\/.*\/test\/.*/);
  });

  it("the templated urls should be unique", function() {
    expect(templatedUrl1.url).not.toEqual(templatedUrl2.url);
  });
});
