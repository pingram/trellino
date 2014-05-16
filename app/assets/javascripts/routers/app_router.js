Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'boardsIndex'
  },

  boardsIndex: function() {
    var view = new Trellino.Views.BoardsIndex({
      collection: Trellino.Collections.boards
    });

    Trellino.Collections.boards.fetch()
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