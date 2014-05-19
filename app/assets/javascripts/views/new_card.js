Trellino.Views.NewCard = Backbone.View.extend({
  template: function() {
    return (this.open ? JST['cards/new'] : JST['cards/newadd']);
  },

  initialize: function (options) {
    this.list = options.list
    this.open = false;
  },

  events: {
    'submit form': 'submit',
    'click .open-btn': 'openForm',
    'click .close-btn': 'closeForm'
  },

  render: function () {
    var renderedContent = this.template()({
      model: new Trellino.Models.Card(),
      newRank: 9999
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
    var newCard = new Trellino.Models.Card($target.serializeJSON()['card']);
    newCard.set('list_id', list.id);
    list.cards().create(newCard, {
      success: function () {
        console.log('card saved successfully');
        $target.find('input.card-title').val('');
        view.open = false;
        view.render();
      }
    })  
  },
});