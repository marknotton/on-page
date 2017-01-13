// Usage:
// If you just want to check an element exists on the page:
// $('.sidebar').onPage(function(){
//   console.log('Sidebar is here');
// });

// Or if you already have a function
// $('.sidebar').onPage(someFunction);

// You can pass in variables in two ways
// $('.sidebar').onPage(someFunction('hello world'));
// $('.sidebar').onPage(someFunction, 'hello world' );

// If you want to delay this check, add a number in 'ms':
// $('.sidebar').onPage(5000, function(){
//   console.log('Sidebar is here and took 5 seconds to check');
// });

// $('.sidebar').onPage(5000, someFunction);

(function($){

  // TODO: Add notOnPage option
  $.fn.notOnPage = function() {

  }

  $.fn.onPage = function() {
    var args = Array.prototype.slice.call(arguments),
        delay = false,
        delayCheck = false,
        callbackTrue = null,
        callbackFalse = null;

    // Check if first argument is a number. If it is, define delay variables
    // and remove it from the args array.
    if(typeof args[0] == 'number') {
      delay = args.shift();
    }

    // Loop through remaining arguments
    for(var i = 0; i < args.length; ++ i) {
      var setting = args[i];

      // Check for functions
      if (typeof setting == 'function') {
        if ( callbackTrue == null ) {
          callbackTrue = setting;
        } else if ( callbackFalse == null ) {
          callbackFalse = setting;
        }
      } else if (typeof setting == 'boolean') {
        delayCheck = setting;
      }
    }

    var selector = this;

    if ( delayCheck ) {
      console.log('delaying for ' + delay + ' seconds before checking wether the element exists on page');
      //TODO: if delayCheck is true, perform the setTimeout BEFORE checking
      //if the elements exists on the page. This is so you can add an
      //onPage check, with a delay on items that might be added to the Dom programmatically.
      // delay = false;
    }

    if (delay !== false && callbackTrue == null && callbackFalse == null) {
      console.warn('On Page: You have defined a ' + delay + ' second delay, but no functions to callback when the timeout is complete. Add atleast one callback function in the second argument', selector);
    }

    if ($(selector).length) {
      // Does exist on page
      if (callbackTrue != null) {
        if ( delay && delay !== 0) {
          setTimeout(function() {
            callbackTrue.apply(selector);
          }, delay);
        } else {
          callbackTrue.apply(selector);
        }
      } else {
        return selector;
      }
    } else {
      // Doesn't exist on page
      if (callbackFalse != null) {
        if ( delay && delay !== 0) {
          setTimeout(function() {
            callbackFalse.apply(selector);
          }, delay);
        } else {
          callbackFalse.apply(selector);
        }
      } else {
        return false;
      }
    }
  };

})( jQuery );
