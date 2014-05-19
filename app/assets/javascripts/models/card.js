Trellino.Models.Card = Backbone.Model.extend({
  // urlRoot: 'api/cards',
  validate: function (attributes) {
    if (!attributes || !attributes.title || attributes.title === '') {
      return 'title cannot be blank';
    }
  },

  todos: function () {
    if (!this._todos) {
      this._todos = new Trellino.Collections.CardTodos([], {
        card: this
      })
    }
    
    return this._todos;
  }
});