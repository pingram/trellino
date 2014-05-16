Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function () {
    // return "/api/boards/" + this.board.get("id") + "/lists";
    return this.board.url() + "/lists";
  }
});