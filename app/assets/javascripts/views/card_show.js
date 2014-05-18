Trellino.Views.CardShow = Backbone.View.extend({
  className: 'row card',
  template: JST['cards/show'],

  events: {
    'click .delete-card' : 'delete'
  },

  render: function() {
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.html(renderedContent);
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