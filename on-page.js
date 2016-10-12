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

// TODO: Make if so you can pass params in the function

(function($){

  // Add the selector, function, and breakpoint rules into an array, to be called when the screen resizes
  $.fn.onPage = function() {
    var args = Array.prototype.slice.call(arguments);
    var delay = false;
    var callback = false;

    if(typeof args[0] == 'number') {
      delay = args.shift();
      callback = args.shift();
    } else {
      callback = args.shift();
    }

    var selector = this.selector !== undefined && this.selector !== null && $(this.selector).length ? this.selector : null;

    if (typeof callback == 'function' && selector) {

      if ( delay && delay !== 0) {
          setTimeout(function() {
              callback.apply($(selector), args);
          }, delay);
      } else {
          callback.apply($(selector), args);
      }

      return this.selector;

    } else if ( selector ){

      return this.selector;

    } else {

      return false;

    }
  };

})( jQuery );
