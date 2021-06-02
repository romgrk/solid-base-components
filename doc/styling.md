
# Styling

This document should help you understand how to add your own design system on top
of the various components by showing the HTML structure of each component and by
explaining the different classes available

## Button

```html
<button class='Button Button--medium Button--primary'>
  <span class='Icon'>...</span> Click Me <span class='Icon'>...</span>
</button>
```

Also receives:
 - the class `Button--${props.size}` (default: `medium`)
 - the class `Button--${props.variant}` (default: `primary`)
 - the class `Button--loading` if `props.loading`
 - the class `Button--disabled` if `props.disabled`

## Popover

```html
<!-- this is the output of the `trigger` prop -->
<button id='trigger'></button>

<!-- ... -->

<!-- rendered in a portal, away from the trigger -->
<div class='Popover'>
  <div class='Popover__arrow'></div>
  <div class='Popover__content'>
    <!-- `props.children` -->
  </div>
</div>
```

`.Popover` also gets:
 - the class `Popover--open` if it is open
 - the CSS variable `--trigger-width`, which is the width of the trigger node
 - the `props.class` property if one is provided

## Dropdown

`Dropdown` uses `Button` and `Popover`, so the structure is similar to the one described
just above:

```html
<!-- this is the output of the `trigger` prop -->
<button id='trigger' class='Dropdown'>
  Current Value <span class='Icon'><!-- ... --></span>
</button>

<!-- ... -->

<!-- rendered in a portal, away from the trigger -->
<div class='Popover Dropdown__popover'>
  <div class='Popover__arrow'></div>
  <div class='Popover__content'>
    <ul class='Dropdown__popover'>
      <!-- for an item with selection -->
      <li class='Dropdown__item Dropdown__item--selected'>One</li>
      <!-- for an active item -->
      <li class='Dropdown__item Dropdown__item--active'>Two</li>
      <!-- for an inactive item -->
      <li class='Dropdown__item'>Three</li>
      <!-- when there are no items -->
      <li class='Dropdown__empty'>No options</li>
    </ul>
  </div>
</div>
```
