# On Page Checker

Check if a given element exists on the page. Perform callbacks for both true or false and add delays on those callbacks.

## Installation

```
npm i on-page-checker --save
```

## Usage

Returns boolean if the element exists.
```
$('.element').onPage();
```

Call a function if the element exists on the page. The callback will return one argument, which is the element in question.
```
$('.element').onPage((element) => {
  console.log('.element is on this page', element);
});
```

If the element exist on the page, return the fallback function as above. If it does not exists, call the second function argument.
```
$('.element').onPage((element) => {
  console.log('.element is on this page', element);
}, () => {
  console.log('.element is NOT on this page');
});
```

You can delay the callbacks by adding a unit. Note, the element query is made before the delay is triggered. So if .element i added to the DOM after this function is called, it will return false regardless of the delay.
```
$('.element').onPage(3000, (element) => {
  console.log('.element is on this page', element);
});
```
