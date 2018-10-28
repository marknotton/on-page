////////////////////////////////////////////////////////////////////////////////
// On Page
////////////////////////////////////////////////////////////////////////////////

class onPage {

  constructor(elements, args) {

    // Return false is no elements were passed
    if ( typeof elements == 'undefined' || typeof elements !== 'object') {
      return false;
    }

    // If no argments were passed, just do a check for the elements existance
    if ( !Object.keys(args).length ) {
      return elements.length ? true : false;
    }

    // Callback delay is set to false by default
    let delay = false;

    // Loop through the object and define it's key and value
    Object.entries(args).forEach((entry) => {
      const [key, value] = entry;

      if (!isNaN(key)) {
        switch (typeof value) {
          case 'function':
            if (typeof this.callbackTrue == 'undefined') {
              this.callbackTrue = value;
            } else if (typeof this.callbackFalse == 'undefined') {
              this.callbackFalse = value;
            }
          break
          case 'number':
            if (!delay) {
              delay = value;
            }
          break
        }
      }
    });

    // Manage Callbacks ========================================================

    if ( typeof this.callbackTrue !== 'undefined' ) {

      if ( elements.length ) {

        // Elements exist ------------------------------------------------------

        if ( delay ) {

          setTimeout(() => {
            this.callbackTrue(elements);
          }, delay);

        } else {

          this.callbackTrue(elements);

        }

      } else if (typeof this.callbackFalse !== 'undefined') {

        // Elements don't exist ------------------------------------------------

        if ( delay ) {

          setTimeout(() => {
            this.callbackFalse(elements);
          }, delay);

        } else {

          this.callbackFalse();

        }
      }
    }
  }
}

// =============================================================================
// Pluginify - Convert plugin class into a jQuery plugin
// =============================================================================
if ( window.jQuery && typeof pluginify !== 'undefined') {
  pluginify('onPage', onPage, false);
}
