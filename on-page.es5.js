////////////////////////////////////////////////////////////////////////////////
// On Page
////////////////////////////////////////////////////////////////////////////////

"use strict";

var _slicedToArray = (function() {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
      for (
        var _i = arr[Symbol.iterator](), _s;
        !(_n = (_s = _i.next()).done);
        _n = true
      ) {
        _arr.push(_s.value);
        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
  return function(arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError(
        "Invalid attempt to destructure non-iterable instance"
      );
    }
  };
})();

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

////////////////////////////////////////////////////////////////////////////////
// On Page
////////////////////////////////////////////////////////////////////////////////

var onPage = function onPage(elements, args) {
  var _this = this;

  _classCallCheck(this, onPage);

  // Return false is no elements were passed
  if (
    typeof elements == "undefined" ||
    (typeof elements === "undefined" ? "undefined" : _typeof(elements)) !==
      "object"
  ) {
    return false;
  }

  // If no argments were passed, just do a check for the elements existance
  if (!Object.keys(args).length) {
    return elements.length ? true : false;
  }

  // Callback delay is set to false by default
  var delay = false;

  // Loop through the object and define it's key and value
  Object.entries(args).forEach(function(entry) {
    var _entry = _slicedToArray(entry, 2),
      key = _entry[0],
      value = _entry[1];

    if (!isNaN(key)) {
      switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {
        case "function":
          if (typeof _this.callbackTrue == "undefined") {
            _this.callbackTrue = value;
          } else if (typeof _this.callbackFalse == "undefined") {
            _this.callbackFalse = value;
          }
          break;
        case "number":
          if (!delay) {
            delay = value;
          }
          break;
      }
    }
  });

  // Manage Callbacks ========================================================

  if (typeof this.callbackTrue !== "undefined") {
    if (elements.length) {
      // Elements exist ------------------------------------------------------

      if (delay) {
        setTimeout(function() {
          _this.callbackTrue(elements);
        }, delay);
      } else {
        this.callbackTrue(elements);
      }
    } else if (typeof this.callbackFalse !== "undefined") {
      // Elements don't exist ------------------------------------------------

      if (delay) {
        setTimeout(function() {
          _this.callbackFalse(elements);
        }, delay);
      } else {
        this.callbackFalse();
      }
    }
  }
};

// =============================================================================
// Pluginify - Convert plugin class into a jQuery plugin
// =============================================================================

if (window.jQuery && typeof pluginify !== "undefined") {
  pluginify("onPage", onPage, false);
}
