Trellino.Views.ListShow = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST['lists/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "sync", this.addAllCards)

    this.model.cards().fetch();
    this.model.cards().each(this.addCard.bind(this));
  },

  render: function() {
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    this.renderSubviews();
    return this;
  },

  addCard: function (card) {
    var cardShowView = new Trellino.Views.CardShow({
      model: card
    })

    this.addSubview(".cards", cardShowView);
    cardShowView.render();
  },

  addAllCards: function() {
    var listShowView = this;
    var cards = this.model.cards();
    cards.each(function (card) {
      // console.log('added card ' + card.get('title') +
      //   " rank: " + card.get('rank'));;
      listShowView.addCard(card);
    });
  }
});