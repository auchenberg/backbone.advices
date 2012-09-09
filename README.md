backbone.advices
===============

Bringing Advices to Backbone.

I always missed "filters" from Railsin Backbone. So I spent a little time adding advices, known from (http://en.wikipedia.org/wiki/Advice_in_aspect-oriented_programming)[aspect-oriented programming], which acts in a similar way.

The best way to describe backbone.advices, is by showing this example:

# Example

```javascript
var view = Backbone.AdvicesView.extend({

  // Syntax 1
  beforeAdvices: ['ensureQuerystrings'],

  // Syntax 2
  beforeAdvices: [{
    'onBeforeRender' : { only : ['render'] },
    'getData' : { except : ['render'] }
  }],

  afterAdvices: ['handleErrors'],


  render: function() {
    // Render Logic
    console.log('render');
  },

  // Advices

  getData: function() {
    console.log('getData');
  }

  handleErrors: function() {
    console.log('getData');
  }






});
```
