Trellino.Views.ListShow = Backbone.CompositeView.extend({
  tagName: "li",
  template: JST['lists/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard)

    this.model.cards().fetch();
    // debugger
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

  addCard: function(card) {
    var cardShowView = new Trellino.Views.CardShow({
      model: card
    })

    this.addSubview(".cards", cardShowView);
    cardShowView.render();
  }
});