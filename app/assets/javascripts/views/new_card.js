Trellino.Views.NewCard = Backbone.View.extend({
  template: JST['cards/new'],

  initialize: function (options) {
    this.list = options.list
  },

  events: {
    'submit form': 'submit'
  },

  render: function () {
    var renderedContent = this.template({
      model: new Trellino.Models.Card(),
      newRank: 1000
    });
    this.$el.html(renderedContent);
    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var list = this.list;
    $target = $(event.currentTarget);
    var newCard = new Trellino.Models.Card($target.serializeJSON()['card']);
    newCard.set('list_id', list.id);
    list.cards().create(newCard, {
      success: function () {
        console.log('card saved successfully');
        $target.find('input.card-title').val('');
      }
    })  
  },
});