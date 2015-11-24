import MetaMap from "../src/relayer/MetaMap.js";

describe("MetaMap", function() {
  var metaMap, testObject, testObject2, metaObject;

  beforeEach(function() {
    metaMap = new MetaMap();

    testObject = {};
    testObject2 = {};

    metaObject = {};
  });

  it("should get and retrieve metadata", function() {
    metaMap.defineMetadata("awesome", metaObject, testObject);
    expect(metaMap.getMetadata("awesome", testObject)).toBe(metaObject);
    expect(metaMap.getMetadata("awesome", testObject2)).toBe(undefined);
    expect(metaMap.getMetadata("cheese", testObject)).toBe(undefined);
  });

  it("should report if there is metadata", function() {
    metaMap.defineMetadata("awesome", metaObject, testObject);
    expect(metaMap.hasMetadata("awesome", testObject)).toBe(true);
    expect(metaMap.hasMetadata("awesome", testObject2)).toBe(false);
    expect(metaMap.hasMetadata("cheese", testObject)).toBe(false);
  });

  it("should delete metadata", function() {
    metaMap.defineMetadata("awesome", metaObject, testObject);
    expect(metaMap.getMetadata("awesome", testObject)).toBe(metaObject);
    expect(metaMap.hasMetadata("awesome", testObject)).toBe(true);
    metaMap.deleteMetadata("awesome", testObject);
    expect(metaMap.getMetadata("awesome", testObject)).toBe(undefined);
    expect(metaMap.hasMetadata("awesome", testObject)).toBe(false);
  });
})
