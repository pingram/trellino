Trellino.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],

  events: {
    'click .delete-board' : 'deleteBoard',
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync remove', this.render);
  },

  render: function() {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    // add board id to modal delete button
    $('#confirm-delete').on('show.bs.modal', function(e) {
      var boardId = $(e.relatedTarget).attr('data-board-id');
      $(this).find('.delete-board').attr('data-board-id', boardId);
    });

    return this;
  },

  deleteBoard: function(event) {
    event.preventDefault();
    var boardId = $(event.target).data('board-id');
    var board = this.collection.get(boardId);
    
    // needed to force modal removal from backbone
    $('#confirm-delete').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();

    board.destroy();
    this.collection.remove(board);
  }

});