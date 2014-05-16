Trellino.Collections.Boards = Backbone.Collection.extend({
  url: 'api/boards',
  model: Trellino.Models.Board,

  getOrFetch: function (id) {
    var model;
    var boards = this;

    if (model = this.get(id)) {
      model.fetch();
    } else {
      model = new Trellino.Models.Board({ id: id });
      model.fetch({
        success: function () { boards.add(model) }
      });
    }
    return model;
  }
});

Trellino.Collections.boards = new Trellino.Collections.Boards();