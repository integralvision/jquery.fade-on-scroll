# jquery.fade-on-scroll

Load plugin and its' dependencies.
```HTML
<!-- Place somewhere in the <head> of your document -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script src="jquery.fade-on-scroll"></script>
```

## Examples

### Fade a single element
```HTML
<div class="fade-on-scroll">
  <img src="http://placehold.it/350x150" />
</div>
```

```JavaScript
$(document).ready(function() {
  $('.fade-on-scroll').fadeContentOnScroll();
});
</script>
```

### Fade elements in a block
```HTML
<div class="fade-on-scroll-multiple">
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
</div>
```

```JavaScript
$(document).ready(function() {
  $('.fade-on-scroll-multiple').fadeContentOnScroll({
    elements: '.fade-element'
  });
});
</script>
```

### Config through attributes
```HTML
<div class="fade-on-scroll-multiple" data-fade-elements=".fade-element">
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
</div>
```

```JavaScript
$(document).ready(function() {
  $('.fade-on-scroll-multiple').fadeContentOnScroll();
});
</script>
```

### Auto init configured by attributes
```HTML
<div data-toggle="fade-on-scroll" data-fade-elements=".fade-element">
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
  <div class="fade-element">
    <img src="http://placehold.it/350x150" />
  </div>
</div>
```


## Settings

| settings     | type | default | description |
|--------------|------|---------|-------------|
| `elements`   | `string|null` | `null`  | The selector of elements to animate. |
| `startClass` | `string` | `'fade-start'` | This class will be added to the element to animate. Marks "this element will be animated" |
| `readyClass` | `string` | `false` | This class will be added when loading animation is ready. |
| `threshold`  | `0 <= {number} >= 1` | `0.4` | Start class will be removed when this percentage of the element's height is visible. |
| `length`     | `number` | `400`   | The length of animation in milliseconds. |
| `delay`      | `number` | `250`   | The delay between fading elements when multiple element should be loaded. |

## Setup with attributes

| settings     | attribute name |
|--------------|----------------|
| `elements`   | `data-fade-elements` |
| `startClass` | `data-fade-start-class` |
| `readyClass` | `data-fade-ready-class` |
| `threshold`  | `data-fade-threshold` |
| `length`     | `data-fade-length` |
| `delay`      | `data-fade-delay` |


## Events triggered

| Event name | description |
|------------|-------------|
| `fade-on-scroll.init` | Triggered on the element the plugin is initialized when plugin preparation is ready. |
| `fade-on-scroll.init-element` | Triggered on the fading elements when the plugin preparation is ready. |
| `fade-on-scroll.loading` | Triggered on the fading elements when loading starts (when `startClass` is removed). |
| `fade-on-scroll.loaded` | Triggered on the fading elements when loading ready (after `startClass` is removed delayed by `length`). |
