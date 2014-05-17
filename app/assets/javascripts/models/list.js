Trellino.Models.List = Backbone.Model.extend({
  urlRoot: function () {
    // return "/api/boards/" + this.board.get("id") + "/lists";
    return this.board.url() + "/lists";
  },

  cards: function() {
    if (!this._cards) {
      this._cards = new Trellino.Collections.ListCards([], {
        list: this
      })
    }

    return this._cards
  }
});