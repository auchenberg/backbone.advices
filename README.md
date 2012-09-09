backbone.advices
===============

Bringing Advices to Backbone.

I always missed "filters" from Railsin Backbone. So I spent a little time adding advices, known from [aspect-oriented programming](http://en.wikipedia.org/wiki/Advice_in_aspect-oriented_programming), which acts in a similar way.

The best way to describe backbone.advices, is by showing this example:

# Example

```javascript
var view = Backbone.AdvicesView.extend({

  // Syntax 1
  beforeAdvices: ['ensureQuerystrings'], // -> Getting called after all methods.

  // Syntax 2
  beforeAdvices: [{
    'onBeforeRender' : { only : ['render'] }, //  -> Getting called after render-method.
    'getData' : { except : ['render'] } // -> Getting called after all methods except render-method.
  }],

  afterAdvices: ['handleErrors'],

  // Methods
  render: function() {
    // Render Logic
    console.log('render');
  },

  // Advices
  getData: function() {
    console.log('getData');
  }

  handleErrors: function() {
    console.log('handleErrors');
  }




});
```
