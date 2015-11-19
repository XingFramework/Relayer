import {Inject, Factory, instantiate} from "../src/relayer/injector.js"

describe("injector", function() {
  class First {
    constructor() {

    }
  }

  class Second {
    constructor() {

    }
  }

  class Third {
    constructor(first, secondFactory, something) {
      this.first = first;
      this.second = secondFactory();
      this.something = something;
    }
  }

  Inject(First, factory(Second))(Third);

  var third;

  beforeEach(function() {
    var third = instantiate(Third, "something");
  });

  it("should instantiate singletons", function() {
    expect(third.first instanceof First).toEqual(true);
  });

  it("should instantiate factories", function() {
    expect(third.second instanceof Second).toEqual(true);
  });

  it("should pass parameters on", function() {
    expect(third.something).toEqual("something");
  });
});
