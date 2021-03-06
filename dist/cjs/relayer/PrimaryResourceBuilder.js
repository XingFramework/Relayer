"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PrimaryResourceBuilder = (function () {
  function PrimaryResourceBuilder(response, ResourceClass) {
    _classCallCheck(this, PrimaryResourceBuilder);

    this.response = response;
    this.ResourceClass = ResourceClass;
  }

  _createClass(PrimaryResourceBuilder, [{
    key: "build",
    value: function build(endpoint) {
      var resource = new this.ResourceClass(this.response);
      resource.templatedUrl = endpoint.templatedUrl;
      resource.templatedUrl.addDataPathLink(resource, "$.links.self");
      resource.self = function () {
        return endpoint;
      };

      return resource;
    }
  }]);

  return PrimaryResourceBuilder;
})();

exports["default"] = PrimaryResourceBuilder;
module.exports = exports["default"];