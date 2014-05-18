Trellino.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    '' : 'boardsIndex',
    'boards/new' : 'newBoard',
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

  newBoard: function() {
    var board = new Trellino.Models.Board();
    var view = new Trellino.Views.NewBoard({
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
    // this._installJQueryEvents();
  },

  // _installJQueryEvents: function () {
  //   debugger
  //   $('.card').mouseover(function() {
  //     // debugger
  //     console.log('hola');
  //   });
  // }
});