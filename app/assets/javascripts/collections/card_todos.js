Trellino.Collections.Todos = Backbone.Collection.extend({
  model: Trellino.Models.Todo,

  url: 'api/cards/' + this.card + '/todo_items',

  initialize: function (options) {
    this.card = options.card;
  }
})