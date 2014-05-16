Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],

  events: {
    'click .delete-board' : 'deleteBoard'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  render: function() {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  deleteBoard: function(event) {
    event.preventDefault();
    var boardId = $(event.target).attr('data-id');
    var board = this.collection.get(boardId);
    board.destroy();
    this.collection.remove(board);
  }

});