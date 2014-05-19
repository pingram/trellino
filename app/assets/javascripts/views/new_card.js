Trellino.Views.NewCard = Backbone.View.extend({
  template: function() {
    return (this.open ? JST['cards/new'] : JST['cards/newadd']);
  },

  initialize: function (options) {
    this.list = options.list;
    this.open = false;
    this.card = new Trellino.Models.Card();
    this.listenTo(this.card, 'all', this.invalidInput)
  },

  events: {
    'submit form': 'submit',
    'click .open-btn': 'openForm',
    'click .close-btn': 'closeForm'
  },

  invalidInput: function () {
    console.log('hola');
  },

  render: function () {
    var renderedContent = this.template()({
      model: this.card,
      newRank: 9999   // TODO: change this to one greater than the last card rank
    });
    this.$el.html(renderedContent);
    return this;
  },

  openForm: function (event) {
    event.preventDefault();
    this.open = true;
    this.render();
  },

  closeForm: function (event) {
    event.preventDefault();
    this.open = false;
    this.render();
  },

  submit: function (event) {
    event.preventDefault();
    var view = this;
    var list = this.list;
    $target = $(event.currentTarget);
    this.card.set($target.serializeJSON().card);
    this.card.set('list_id', list.id);
    var card = this.card;
    card.save([], {
      // TODO this is hacky - rework it
      url: "api/lists/" + list.id + "/cards",
      method: 'post',
      success: function () {
        console.log('card saved successfully to DB');
        $target.find('input.card-title').val('');
        list.cards().add(card);
        view.card = new Trellino.Models.Card();
        // TODO: don't like that we have to re-add this:
        view.listenTo(view.card, 'invalid', view.invalidInput);
        view.open = false;
        view.render();
      },
      error: function () {
        console.log('error saving card to DB');
      }
    })
  },
});