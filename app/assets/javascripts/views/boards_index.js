Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render)
  },

  render: function() {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  }
});