backbone.advice
===============

Bringing Advices to Backbone.


# Example


`var view = Backbone.AdvicesView.extend({

  beforeAdvices: ['ensureQuerystrings'],

  beforeAdvices: [{
    'onBeforeRender' : { only : ['render'] },
    'onBefore' : { except : ['render'] }
  }],

  afterAdvices: ['handleErrors'],


});
`
