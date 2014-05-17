Trellino.Models.Board = Backbone.Model.extend({
  urlRoot: 'api/boards',

  lists: function () {
    if (!this._lists) {
      this._lists = new Trellino.Collections.BoardLists([], {
        board: this
      });
    }

    return this._lists;
  },

  members: function() {
    if (!this._members) {
      this._members = new Trellino.Collections.BoardMembers([], {
        board: this
      });
    }

    return this._members;
  },

  parse: function(resp) {
    if (resp.lists) {
      this.lists().set(resp.lists);
      delete resp.lists;
    }
    if (resp.members) {
      this.members().set(resp.members);
      delete resp.members;
    }

    return resp
  }
});