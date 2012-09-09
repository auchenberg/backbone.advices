backbone.advices
===============

Bringing Advices to Backbone.

I always missed "filters" from Rails controllers in Backbone. So I spent a little time adding advices, known from [http://en.wikipedia.org/wiki/Advice_in_aspect-oriented_programming](aspect-oriented programming), which acts in a similar way.

The best way to describe backbone.advices, is by showing this example:

# Example

```javascript
var view = Backbone.AdvicesView.extend({

  beforeAdvices: ['ensureQuerystrings'],

  beforeAdvices: [{
    'onBeforeRender' : { only : ['render'] },
    'onBefore' : { except : ['render'] }
  }],

  afterAdvices: ['handleErrors'],


});
```
