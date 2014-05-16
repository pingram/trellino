Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'boardsIndex',
    'boards/:id' : 'boardShow'
  },

  boardsIndex: function() {
    var view = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });

    Trellino.Collections.boards.fetch()
    this._swapView(view);
  },

  boardShow: function(id) {
    var board = Trellino.Collections.boards.getOrFetch(id);
    var view = new Trellino.Views.BoardShow({
      model: board
    })
    this._swapView(view);
  },

  _swapView: function(view) {
    if (this._currentView) {
      this._currentView.remove();
    }
    this._currentView = view;
    $('#content').html(view.render().$el);
  }
});