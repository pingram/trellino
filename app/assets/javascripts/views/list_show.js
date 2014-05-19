Trellino.Views.ListShow = Backbone.CompositeView.extend({
  // tagName: "li",
  className: 'col-md-3 list',
  template: JST['lists/show'],

  initialize: function() {
    this.listenTo(this.model, "sync", this.addAllCards);
    this.listenTo(this.model.cards(), "add destroy", this.addAllCards)

    // TODO: remove this extra fetch if possible
    this.model.cards().fetch();
    this.model.cards().each(this.addCard.bind(this));

    var newCardView = new Trellino.Views.NewCard({
      list: this.model
    });
    this.addSubview('.new-card', newCardView);
  },

  render: function() {
    var view = this;
    var renderedContent = this.template({
      list: this.model
    });

    this.$el.html(renderedContent);
    this.renderSubviews();

    $("#sortable-list-" + view.model.id).sortable({
      stop: function(evt, ui){
        view.sortUpdate($("#sortable-list-" + view.model.id).sortable('toArray',
          { attribute: 'data-card-id' }
        ));
      }
    });

    $(".sortable").sortable('toArray', { attribute: 'data-card-id' })
    $( ".sortable" ).disableSelection();

    return this;
  },

  sortUpdate: function(newIds) {
    console.log('\n\n');
    var listId = this.model.id;
    // for (var i = 0; i < newIds.length; i++) {
    //   var mycard = this.model.cards().models[i];
    //   console.log(mycard.get('rank') + ": " + mycard.id);
    // }

    for (var i = 0; i < newIds.length; i++) {
      var mycard = this.model.cards().models[i];
      mycard.set('rank', newIds.indexOf("" + mycard.id));
    }

    this.model.cards().each(function(card) {
      // card.url = "api/cards/" + card.id;

    // debugger
      card.save([],{
        url: "api/cards/" + card.id, // Trellino.Models.Card.urlRoot
        success: function() {console.log('success')}
      });
    });

    // for (var i = 0; i < newIds.length; i++) {
    //   var mycard = this.model.cards().models[i];
    //   console.log(mycard.get('rank') + ": " + mycard.id);
    // }
  },

  addCard: function (card) {
    var cardShowView = new Trellino.Views.CardShow({
      model: card
    })

    this.addSubview(".cards", cardShowView);
    cardShowView.render();
  },

  removeAllCards: function() {
    _(this.subviews()['.cards']).each(function (subview) {
      subview.remove();
    });
  },

  addAllCards: function() {
    if (this.subviews()['.cards']) {
      this.removeAllCards();
    }
    var listShowView = this;
    var cards = this.model.cards();
    cards.each(function (card) {
      // console.log('added card ' + card.get('title') +
      //   " rank: " + card.get('rank'));;
      listShowView.addCard(card);
    });
  }
});