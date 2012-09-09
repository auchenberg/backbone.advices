(function() {

  // Credits goes to https://gist.github.com/2864853

  var fn = {
    around: function(base, wrapped) {
      return function() {
        var args =  _.toArray(arguments);
        return wrapped.apply(this, [_.bind(base, this)].concat(args))
      }
    },

    before: function(base, before) {
      return fn.around(base, function() {
        var args = _.toArray(arguments),
          orig = args.shift()

        before.apply(this, args)
        return (orig).apply(this, args)
      })
    },

    after: function(base, after) {
      return fn.around(base, function() {
        var args = _.toArray(arguments),
          orig = args.shift(),
          res = orig.apply(this, args)

        after.apply(this, args)
        return res
      })
    }
  };

  var withAdvice = function() {
    _.each(['before', 'after', 'around'], function(m) {
      this[m] = function(method, advice) {
        if ( _.isFunction(this[method]) ) {
          return this[method] = fn[m](this[method], advice);
        } else {
          return this[method] = advice;
        }
      };
    }, this);
  };

  var parseAdvices = function(type, methods, options) {
    var advicesToParse;

    if(!options) {
      return [];
    }

    if(_.isString(options[0])) {
      advicesToParse = options;
    } else if(_.isObject(options[0])) {
      advicesToParse = options[0];
    }

    // Parse before advices
    var advices = _.map(advicesToParse, function(value, key) {

      var filteredMethods;

      if(_.isString(value)) {
        return  {
          callback : value,
          type   : type,
          methods: methods
        };

      } else if(_.isObject(value)) {

        if(value.only) {
          filteredMethods = _.filter(methods, function(item) {
            return _.include(value.only, item);
          });
        }

        if(value.except) {
          filteredMethods = _.reject(methods, function(item) {
            return _.include(value.except, item);
          });
        }

        return {
          callback  : key,
          type    : type,
          methods : filteredMethods
        };
      }
    });

    return advices;
  };

  Backbone.AdvicesView = Backbone.View.extend({

    _applyAdvices : function() {
      _.each(this._advices, _.bind(function(advice) {
        _.each(advice.methods, _.bind(function(method) {
          var callback = this[advice.callback];
          if(callback){
            this[advice.type](method, callback);
          }
        }, this));
      }, this));
    },

    constructor: function() {
      this._advices = [];

      // Apply withAdvice mixin
      withAdvice.call(this);

      // Parse advices
      var methods = _.functions(this);
      this._advices = this._advices.concat(parseAdvices('before', methods, this.beforeAdvices));
      this._advices = this._advices.concat(parseAdvices('after', methods, this.afterAdvices));
      this._advices = this._advices.concat(parseAdvices('around', methods, this.aroundAdvices));

      // Apply advices
      this._applyAdvices();

      //Default constructor
      Backbone.View.apply(this, arguments);
    }

  });


}).call(this);
