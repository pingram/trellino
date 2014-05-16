Trellino.Views.NewList = Backbone.View.extend({
  template: JST['lists/new'],

  initialize: function (options) {
    this.board = options.board;
  },

  render: function() {
    var renderedContent = this.template({
      board: this.board
    });

    this.$el.html(renderedContent);
    return this;
  }
});