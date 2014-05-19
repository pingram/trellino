Trellino.Models.Card = Backbone.Model.extend({
  // urlRoot: 'api/cards',
  validate: function (attributes) {
    if (!attributes || !attributes.title || attributes.title === '') {
      return 'title cannot be blank';
    }
  }
});