Trellino.Views.NewList = Backbone.View.extend({
  template: JST['lists/new'],

  events: {
    'submit #new-list' : 'submit'
  },

  initialize: function (options) {
    this.board = options.board;
  },

  render: function() {
    var renderedContent = this.template({
      board: this.board
    });

    this.$el.html(renderedContent);
    return this;
  },

  submit: function(event) {
    var view = this;
    var form = $(event.currentTarget);

    event.preventDefault();

    var params = form.serializeJSON()["list"];
    var list = new Trellino.Models.List(params);
    list.board = this.board;

    list.save({}, {
      success: function(resp) {
        view.board.lists().add(list);
        view.$('.user-input').val("");
        console.log('list added');
      }
    })
  }
});