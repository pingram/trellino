Trellino.Collections.BoardLists = Backbone.Collection.extend({
  model: Trellino.Models.List,

  url: function () {
    // return "/api/boards/" + this.board.get("id") + "/lists";
    return this.board.url() + "/lists";
  },

  initialize: function (models, options) {
    this.board = options.board;
  }
});