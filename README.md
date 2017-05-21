# On Page

Check if a given element exists on the page. Perform callbacks for both true or false and add delays on those callbacks.

## Installation

### [NPM](https://www.npmjs.com/package/on-page-checker)
```
npm i on-page-checker
```

### [Yarn](https://yarnpkg.com/en/package/on-page-checker)
```
yarn add on-page-checker
```

### Bower
```
bower install on-page-checker
```

## Usage

If given element exists on the page, returns element object. Otherwise returns ```false``` boolean
```
$('.element').onPage();
```

Call a function if the element exists on the page. You can refer to ```this``` for the element object (if it exists).
```
$('.element').onPage(function() {
  console.log('.element is on this page', this);
});
```

If the element exitst on the page, return the fallback function as above. If it does not exists, call the second function argument.
```
$('.element').onPage(function() {
  console.log('.element is on this page', this);
}, function() {
  console.log('.element is NOT on this page');
});
```

You can delay the callbacks by adding a unit as the first argument.
```
$('.element').onPage(3000, function() {
  console.log('.element is on this page', this);
});
```

## TODO

To make the callbacks trigger only after the element check has been delayed, add ```true``` to the argument list.
This is designed to be used if you expect an elements to be added to the DOM programmatically.
```
$('.element').onPage(3000, true, function() {
  console.log('.element is on this page', this);
});
```

All of the above works as above, only the callback functions will be triggered in reverse order
```
$('.element').notOnPage( ... );
```
