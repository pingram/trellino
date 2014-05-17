Trellino.Views.NewList = Backbone.View.extend({
  template: function () {
    return (this.open ? JST['lists/new'] : JST['lists/newadd']);
  },

  initialize: function (options) {
    this.open = false;

    this.board = options.board;

    this.listenTo(this.board.lists(), 'add', this.render);
  },

  events: {
    'submit #new-list' : 'submit',
    'click .open-view' : 'openNew',
    'click .close-form' : 'closeNew'
  },

  render: function() {
    var renderedContent = this.template()({
      board: this.board
    });

    this.$el.html(renderedContent);
    return this;
  },

  openNew: function() {
    this.open = true;
    this.render();
  },

  closeNew: function() {
    this.open = false;
    this.render();
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
        view.open = false;
        view.board.lists().add(list);
        view.$('.user-input').val("");
        console.log('list added');
      }
    })
  }
});