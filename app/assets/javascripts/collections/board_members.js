Trellino.Collections.BoardMembers = Backbone.Collection.extend({
  model: Trellino.Models.Member,

  url: function () {
    // return "/api/boards/" + this.board.get("id") + "/members";
    return this.board.url() + '/members';
  },

  initialize: function (models, options) {
    this.board = options.board;
  }
});