Trellino.Collections.ListCards = Backbone.Collection.extend({
  url: function () {
    // return "/api/boards/" + this.list.get("id") + "/cards";
    // debugger
    // console.log(this.list.id)
    return "api/lists/" + this.list.id + "/cards";
  },

  initialize: function (models, options) {
    this.list = options.list;
  }
});