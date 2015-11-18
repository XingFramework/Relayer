// the idea is to extract the logic that handles creating the resource class
// from the backend's returned data
// and setting up the data to post to the backend to its own class
// but then that got me thinking this is a better spot in general to add
// customization like lists, admin role endpoints, paginated endpoints, etc
// I even had the idea that these could potentially be chained
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _ConstructableJs = require('../Constructable.js');

var _ConstructableJs2 = _interopRequireDefault(_ConstructableJs);

var ResourceTransformer = (function (_Constructable) {
  function ResourceTransformer() {
    _classCallCheck(this, ResourceTransformer);

    if (_Constructable != null) {
      _Constructable.apply(this, arguments);
    }
  }

  _inherits(ResourceTransformer, _Constructable);

  _createClass(ResourceTransformer, [{
    key: 'raansformRequest',
    value: function raansformRequest(endpoint, resource) {
      return resource;
    }
  }, {
    key: 'transformResponse',
    value: function transformResponse(endpoint, response) {
      return response;
    }
  }]);

  return ResourceTransformer;
})(_ConstructableJs2['default']);

exports['default'] = ResourceTransformer;
module.exports = exports['default'];