Trellino.Views.NewBoard = Backbone.View.extend({
  template: JST['boards/new'],

  events: {
    'submit #new-board': 'createBoard'
  },

  render: function() {
    var renderedContent = this.template({
      board: this.model
    });
    this.$el.html(renderedContent);
    return this;
  },

  createBoard: function(event) {
    event.preventDefault();
    var params = $(event.currentTarget).serializeJSON()["board"];
    var newBoard = new Trellino.Models.Board(params);
    newBoard.save({}, {
      success: function (resp) {
        Trellino.Collections.boards.add(newBoard);
        Backbone.history.navigate("boards/" + newBoard.id, { trigger: true });
      }
    });
  }
});