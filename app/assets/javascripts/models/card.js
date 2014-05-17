Trellino.Models.Card = Backbone.Model.extend({
  urlRoot: function () {
    // return "/api/boards/" + this.list.get("id") + "/cards";
    return this.list.url() + "/cards";
  }
});