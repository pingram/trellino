Trellino.Views.CardShow = Backbone.View.extend({
  className: 'row card',
  template: JST['cards/show'],

  events: {
    'click .delete-card' : 'delete',
    'mouseover': 'mouseoverFn',
    'mouseleave': 'mouseleaveFn'
  },

  mouseoverFn: function(event) {
    $target = $(event.currentTarget);
    $target.find('.delete-card').show();
  },

  mouseleaveFn: function (event) {
    $target = $(event.currentTarget);
    $target.find('.delete-card').hide();
  },

  render: function() {
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.html(renderedContent);
    this.$el.find('.delete-card').hide();
    return this;
  },

  delete: function (event) {
    debugger
    this.model.destroy();
    // event.preventDefault();
    // card = this.model;
    // debugger
    // card.destroy({
    //   success: function() {
    //     console.log('card deleted');
    //   }
    // });
  }
});