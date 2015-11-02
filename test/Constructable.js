import Constructable from "../src/relayer/Constructable.js";

describe("Constructable.new works", () => {
  var classMap = {};

  class Sub extends Constructable {
    constructor(x){ super(); this.x = x; }
  }
  class SubSub extends Sub {
    constructor(x, y){ super(x); this.y = y; }
  }

  it('creates an Constructable', function() {
    expect(Constructable.new(classMap)).not.toBeUndefined();
  });

  it('subclasses work', function() {
    var subsub = SubSub.new(classMap, 1,2);
    expect(subsub.x).toEqual(1);
    expect(subsub.y).toEqual(2);
  });
});
