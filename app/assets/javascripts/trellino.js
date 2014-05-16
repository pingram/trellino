window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Trellino.Routers.AppRouter();

    Backbone.history.start();
  }
};


Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  // TODO: this is not getting called; why?
  remove: function() {
    Backbone.View.prototype.remove.call(this);

    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview) {
        subview.remove();
      });
    })
  },

  removeSubview: function(selector, subview) {
    var selectorSubviews = 
      this.subviews()[selector] || (this.subviews()[selector] = []);
    subViewIndex = this.subviews.indexOf(subview);
    selectorSubviews.splice(subViewIndex, 1);
    subview.remove();
  },

  renderSubviews: function() {
    var view = this;
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();
      _(selectorSubviews).each(function (subview){
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
  },
})



$(document).ready(function(){
  Trellino.initialize();
});